package com.soen343.server.gateways;

import com.soen343.server.models.catalog.Magazine;

import java.sql.*;

public class MagazineGateway{

    private static final String url = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String Username = "test";
    private static final String Password = "testtest";


    private static Connection connect(){
        Connection connection = null;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(url, Username, Password);
        }
        catch (Exception e){
            System.out.print(e);
        }
        return connection;
    }


}