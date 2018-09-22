package com.soen343.databaseConnection;

import java.sql.*;

public class DbConnection {

    public static void update(String query){
        try {
            Connection con = connect();
            // Database Connection
            Statement stmt = con.createStatement();
            // SQL Query to search
            stmt.executeUpdate(query);
            con.close();
        } 
        catch (Exception e) {
            System.out.println(e);
        } 
    }
    
    // opens the connection to the database
    // should only be used in this class 
    public static Connection connect(){
        Connection connection = null;
        try{
        Class.forName("com.mysql.jdbc.Driver");
         connection = DriverManager.getConnection("jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb", "test", "testtest");
        }
        catch (Exception e){
            System.out.print(e);
        }
        return connection;
    }
}