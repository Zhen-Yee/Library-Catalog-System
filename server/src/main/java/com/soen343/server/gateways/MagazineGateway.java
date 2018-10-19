package com.soen343.server.gateways;
import java.sql.*;
import com.soen343.server.models.catalog.Magazine;


public class MagazineGateway {
    

    // replace with property calls
    private static final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String USERNAME = "test";
    private static final String PASSWORD = "testtest";

    public static void insert(Magazine magazine){

    }

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
            "', year_of_publication = '" + magazine.getDateOfPublication() + "' WHERE id = " + magazine.getId() ;

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


}
