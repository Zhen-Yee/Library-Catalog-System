package com.soen343.server.gateways;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Music;

import java.sql.*;

public class MusicGateway{

    public static void insert(Music music){
        String columnName = "qty_in_stock, qty_on_loan, title, artist, asin, label, release_date, type";
        String values= music.getQtyInStock() + ", " + music.getQtyOnLoan() + ", " + music.getTitle() + ", " + 
                         music.getArtist() + ", " + music.getAsin() + ", " + music.getLabel() + ", " + music.getReleaseDate() + ", " +music.getType();
        
        String query = "INSERT INTO testdb.music (" + columnName + ") VALUES (" + values + ")";

        try{
            //need to add conditions 
            Connection conn = DbConnection.connect();
            Statement stmt = conn.createStatement();

            stmt.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);

            conn.close();

        }catch(Exception e){
            e.printStackTrace();
        }

    }
    
    /*
    public boolean checkIfMusicExist(String title, String artist){
        if()
    }
    */

}