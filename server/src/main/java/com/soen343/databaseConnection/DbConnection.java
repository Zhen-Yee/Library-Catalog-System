package com.soen343.databaseConnection;

import java.sql.*;

public class DbConnection {

    // void function since update is a POST and we do not need to return anything
    // to be changed if we need to use POST to read data in the future
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

    // returns a Connector Object containing the connection, the resultset and the statement
    public static Connector get(String query){
        Connector conn = null;
        try {
            Connection con = connect();
            // Database Connection
            Statement stmt = con.createStatement();
            // SQL Query to search
            ResultSet rs = stmt.executeQuery(query);

            conn = new Connector(rs, con, stmt);
        } 
        catch (Exception e) {
            System.out.println(e);
        } 
        return conn;
    }
    
    // opens the connection to the database
    // should only be used in this class 
    public static Connection connect(){
        Connection connection = null;
        try{
        Class.forName("com.mysql.jdbc.Driver");
         connection = DriverManager.getConnection("jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false", "test", "testtest");
        }
        catch (Exception e){
            System.out.print(e);
        }
        return connection;
    }
}