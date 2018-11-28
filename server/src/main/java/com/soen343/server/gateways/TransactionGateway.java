package com.soen343.server.gateways;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.Transaction;
import com.soen343.server.models.catalog.Book;
import com.soen343.server.models.catalog.CatalogItem;
import com.soen343.server.models.catalog.Movie;
import com.soen343.server.models.catalog.Music;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class  TransactionGateway {
    private final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private final String USERNAME = "test";
    private final String PASSWORD = "testtest";
    /**
     * Gateways objects
     */
    private BookGateway bookGateway;
    private MusicGateway musicGateway;
    private MovieGateway movieGateway;

    private static TransactionGateway transactionGateway = null;

    private  Connector connector;

    private TransactionGateway() {
        bookGateway = BookGateway.getBookGateway();
        musicGateway = MusicGateway.getMusicGateway();
        movieGateway = MovieGateway.getMovieGateway();
    }

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
    public void update(int id) {
        long yourmilliseconds = System.currentTimeMillis();
        SimpleDateFormat sdf = new SimpleDateFormat("MMM dd,yyyy HH:mm");
        Date resultdate = new Date(yourmilliseconds);
        String query= "UPDATE testdb.transaction SET date_returned = '" + sdf.format(resultdate) + "' WHERE id = '" + id + "'";
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


    public List<Transaction> getAllLoanedItems(String user_email){
        List<Transaction> loanedItem= new ArrayList<>();
        String query = "SELECT * from testdb.transaction WHERE user_email = '" + user_email + "'" + " AND date_returned IS NULL";
        try{
            Connector connector = DbConnection.get(query);
            ResultSet r = connector.getResultSet();

            while(r.next()) {
                Transaction trans= new Transaction(
                        r.getLong("id"),
                        r.getString("user_email"),
                        r.getString("item_type"),
                        r.getInt("item_id"),
                        r.getString("checkout_date"),
                        r.getString("due_date"),
                        r.getString("date_returned")
                );

                switch (trans.itemType) {
                    case "book":
                        Book b = bookGateway.get(trans.item_id);
                        loanedItem.add(new Transaction(trans,b));
                        break;
                    case "movie":
                        Movie mo = movieGateway.get(trans.item_id);
                        loanedItem.add(new Transaction(trans,mo));
                        break;
                    case "music":
                        Music mu = musicGateway.get(trans.item_id);
                        loanedItem.add(new Transaction(trans,mu));
                        break;
                }
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return loanedItem;
    }

    public List<Transaction> getAllTransactions(){

        List<Transaction> transArrayList = new ArrayList<>();

        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            stmt.executeQuery("SELECT  * from testdb.transaction");
            ResultSet transResultSet = stmt.getResultSet();
            buildFromResultSet(transArrayList, transResultSet);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return transArrayList;

    }

    private void buildFromResultSet(List<Transaction> transArrayList, ResultSet transResultSet) throws SQLException {
        while (transResultSet.next()) {
            Transaction transaction = new Transaction(
                    transResultSet.getLong("id"),
                    transResultSet.getString("user_email"),
                    transResultSet.getString("item_type"),
                    transResultSet.getInt("item_id"),
                    transResultSet.getString("checkout_date"),
                    transResultSet.getString("due_date"),
                    transResultSet.getString("date_returned")
            );
            if(transaction.itemType.equals("book")) {
                Book b = bookGateway.get(transaction.item_id);
                transArrayList.add(new Transaction(transaction.getUserEmail(), b, "book", transaction.checkoutDbDate, transaction.dueDbDate, transaction.returnedDbDate));
            }
            else if(transaction.itemType.equals("movie")) {
                Movie mo = movieGateway.get(transaction.item_id);
                transArrayList.add(new Transaction(transaction.getUserEmail(), mo, "movie", transaction.checkoutDbDate, transaction.dueDbDate, transaction.returnedDbDate));
            }
            else if(transaction.itemType.equals("music")) {
                Music mu = musicGateway.get(transaction.item_id);
                transArrayList.add(new Transaction(transaction.getUserEmail(), mu, "music", transaction.checkoutDbDate, transaction.dueDbDate, transaction.returnedDbDate));
            }
            //transArrayList.add(transaction);
        }
    }

    public List<Transaction> getUserTransactions(String userEmail){

        List<Transaction> transArrayList = new ArrayList<>();

        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            stmt.executeQuery("SELECT  * from testdb.transaction WHERE user_email= '" + userEmail+ "'");
            ResultSet transResultSet = stmt.getResultSet();

            buildFromResultSet(transArrayList, transResultSet);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return transArrayList;

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

    private String getTableName(CatalogItem catalogItem){
        if (catalogItem.getClass() == Book.class) {
            return "book";
        } else if (catalogItem.getClass() == Music.class) {
            return "music";
        } else {
            return "movie";
        }
    }
}
