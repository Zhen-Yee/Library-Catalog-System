package com.soen343.server.gateways;

import com.soen343.server.models.Transaction;
import com.soen343.server.models.catalog.Book;
import com.soen343.server.models.catalog.CatalogItem;
import com.soen343.server.models.catalog.Music;
import org.springframework.stereotype.Service;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.databaseConnection.Connector;
import java.util.List;
import java.util.ArrayList;


import java.sql.*;

@Service
public class TransactionGateway {
    private final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private final String USERNAME = "test";
    private final String PASSWORD = "testtest";

    private static TransactionGateway transactionGateway = null;

    private TransactionGateway() {}

    public static TransactionGateway getGateway() {
        if (transactionGateway == null) {
            transactionGateway = new TransactionGateway();
        }
        return transactionGateway;
    }

    public void insert(Transaction transaction){
        String columns = "user_email, item_type, item_id, checkout_date, due_date";
        String userEmail = transaction.getUserEmail();
        String tableName = getTableName(transaction.getCatalogItem());
        long itemID = transaction.getCatalogItem().getId();
        String checkoutDate = transaction.getCheckoutDate().toString();
        String dueDate = transaction.getDueDate().toString();
        String values = "'" + userEmail + "', '" + tableName + "', '" + itemID + "', '" + checkoutDate + "', '" + dueDate + "'";

        String query = "INSERT INTO testdb.transaction (" + columns + ") VALUES (" + values + ")";

        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            stmt.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
            ResultSet keys = stmt.getGeneratedKeys();
            long id = 0;
            while (keys.next()) {
                id = keys.getLong(1);
            }
            transaction.setId(id);

            conn.close();
        } catch (SQLException e) {
            System.out.println("Unable to connect to database");
            e.printStackTrace();
        }
    }
    //update function for the 
    public void update(Transaction transaction){
         String userEmail = transaction.getUserEmail();
         long itemID = transaction.getCatalogItem().getId();
         String returnDate= transaction.getDateReturned().toString();
         String query= "UPDATE testdb.transaction SET date_return = '" + returnDate + "'" + "' WHERE user_email = '" + userEmail + "' AND item_id = " + itemID;
         System.out.println(query);
         try{
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            
            stmt.executeUpdate(query);
            conn.close();
         }catch(Exception e){
             e.printStackTrace();
         }
    }

    //get All Loaned Items item id
    public List<Long> getAllLoanedItems(Transaction transaction){
        String userEmail = transaction.getUserEmail();
        List<Long> loanedItem= new ArrayList<>(); 
        long itemid;
        String query = "SELECT * from testdb.transaction WHERE user_email = '" + userEmail + "";
        System.out.println(query);
        try{
            Connector connector = DbConnection.get(query);
            ResultSet r = connector.getResultSet();
            while(r.next()){
                 if (r.getString("date_return").equals(null)){
                     itemid=r.getLong("item_id");
                     loanedItem.add(itemid);
                 }else{
                     continue;
                 }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return loanedItem;
    }



    private String getTableName(CatalogItem catalogItem){
        if (catalogItem.getClass() == Book.class) {
            return "book";
        } else if (catalogItem.getClass() == Music.class) {
            return "music";
        } else {
            return "movie";
        }
    }

    private Connection connect(){
        Connection connection = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
        }
        catch (Exception e){
            System.out.print(e);
        }
        return connection;
    }
}
