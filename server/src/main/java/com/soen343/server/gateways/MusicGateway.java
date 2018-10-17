package com.soen343.server.gateways;

import com.soen343.server.models.catalog.Music;

import java.sql.*;

public class MusicGateway{

    private static final String url = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String Username = "test";
    private static final String Password = "testtest";


    public static void insert(Music music){
        String columnName = "qty_in_stock, qty_on_loan, title, artist, asin, label, release_date, type";
        String values= music.getQtyInStock() + ", " + music.getQtyOnLoan() + ", " + music.getTitle() + ", " + 
                         music.getArtist() + ", " + music.getAsin() + ", " + music.getLabel() + ", " + music.getReleaseDate() + ", " +music.getType();
        

    }


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