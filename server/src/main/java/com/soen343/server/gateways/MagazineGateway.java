package com.soen343.server.gateways;
import java.sql.*;
import com.soen343.server.models.catalog.Magazine;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Magazine;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MagazineGateway {


    private static Connector connector;
    
    // replace with property calls
    private static final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String USERNAME = "test";
    private static final String PASSWORD = "testtest";



    public static void delete(long id) {
    }

    public static void update(Magazine magazine) {
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            // SQL QUERY STATEMENT
            String query = "UPDATE testdb.magazine SET qty_in_stock = '" + magazine.getQtyInStock() + "', qty_on_loan = '" + magazine.getQtyOnLoan() + "', title = '" + magazine.getTitle() + 
            "',  isbn10 = '" + magazine.getIsbn10() + "', isbn13 = '" + magazine.getIsbn13() + 
            "', language = '" + magazine.getLanguage() + "', publisher = '" + magazine.getPublisher() + 
            "', date_of_publication = '" + magazine.getDateOfPublication() + "' WHERE id = " + magazine.getId() ;

            stmt.executeUpdate(query);
            
            conn.close();
            
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    // change for a DataSource later?
    private static Connection connect(){
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

    //language=SQL
    private static final String SQL_GET_ALL_MAGAZINES = "SELECT * from testdb.magazine";

    
    /**
     * Query all {@link Magazine} from the database
     * @return
     */
    public static List<Magazine> getAll() {
        List<Magazine> magazineArrayList = new ArrayList<>();
        connector = DbConnection.get(SQL_GET_ALL_MAGAZINES);
        ResultSet resultSet = connector.getResultSet();
      

        try {
            while (resultSet.next()) {
                Magazine magazine = new Magazine(
                        resultSet.getString("title"),
                        resultSet.getInt("qty_in_stock"),
                        resultSet.getInt("qty_on_loan"),
                        resultSet.getString("publisher"),
                        resultSet.getString("language"),
                        resultSet.getString("date_of_publication"),
                        resultSet.getString("isbn10"),
                        resultSet.getString("isbn13")
                );
                magazine.setId(resultSet.getInt("id"));
                magazineArrayList.add(magazine);
            }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        } finally {
            connector.close();
        }
        return magazineArrayList;
    }

    public static void insert(Magazine magazine){
        if(checkIfMagazineExists(magazine.getTitle())){
            int QtyStock=(getQty(magazine.getTitle()) + 1);
            String query="UPDATE testdb.magazine SET qty_in_stock = " + QtyStock + " WHERE title = '" + magazine.getTitle() + "'";
            System.out.println(query);
            //System.out.println(magazine.getQtyInStock() + 1);
            try{
                DbConnection.update(query);
            }catch(Exception e){
               e.printStackTrace();
            }
        }else{
        magazine.setQtyInStock(1);
        String columnName = "qty_in_stock, qty_on_loan, title, publisher, language, isbn10, isbn13, date_of_publication";
        String values= magazine.getQtyInStock()+ ", "+ magazine.getQtyOnLoan()+ ", '" + magazine.getTitle()+"', '"+ magazine.getLanguage() + "', '" + magazine.getPublisher() + "', '" + magazine.getDateOfPublication() + "', '" + magazine.getIsbn10() + "', '" +magazine.getIsbn13()+"'";
        
        String query = "INSERT INTO testdb.magazine (" + columnName + ") VALUES (" + values + ")";
       
        
        try{
            DbConnection.update(query);

        }catch(Exception e){
            e.printStackTrace();
        }
      }
    }


public static boolean checkIfMagazineExists(String title){
         boolean check=false;
         try{
          String query="SELECT * FROM testdb.magazine WHERE title = '" + title +"'";
          connector=DbConnection.get(query);
          ResultSet r=connector.getResultSet();
          if(r.next()){
              check=true;
          }
          connector.close();
         }catch(Exception e){
             e.printStackTrace();
         }
         return check;
    }

    public static int getQty(String title){
        int qtyStock=0;
        try{
            String query="SELECT * FROM testdb.magazine WHERE title = '" + title +"'";
            connector=DbConnection.get(query);
            ResultSet r=connector.getResultSet();
            if(r.next()){
            qtyStock=r.getInt("qty_in_stock");
         } 
            connector.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        return qtyStock;
    }

}


