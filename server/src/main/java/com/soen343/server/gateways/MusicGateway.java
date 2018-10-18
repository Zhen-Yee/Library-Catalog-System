package com.soen343.server.gateways;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Music;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MusicGateway {

    private static Connector connector;

    //language=SQL
    private static final String SQL_GET_ALL_MUSICS = "SELECT  * from testdb.music";

    // UPDATE METHOD FOR MUSIC
    public static void update(Music music) {
        try {
            // SQL QUERY STATEMENT 
            String query = "UPDATE testdb.music SET qty_in_stock = '" + music.getQtyInStock() + "', qty_on_loan = '" + music.getQtyOnLoan() + "', title = '" + music.getTitle() + 
            "', artist = '" + music.getArtist() + "', asin = '" + music.getAsin() + "', label = '" + music.getLabel() + "', release_date = '" + music.getReleaseDate() + 
            "', type = '" + music.getType() + "' WHERE id = " + music.getId() ;
            System.out.println(query);
            // Pass in SQL statement to DbConnection update function to execute query
            DbConnection.update(query);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    /**
     * Query all {@link Music} from the database
     * @return List<Music>
     */
    public static List<Music> getAll() {
        List<Music> musicArrayList = new ArrayList<>();
        connector = DbConnection.get(SQL_GET_ALL_MUSICS);
        ResultSet resultSet = connector.getResultSet();
        System.out.println(resultSet);
        try {
            while (resultSet.next()) {
                Music music = new Music(
                    resultSet.getString("title"),
                    resultSet.getInt("qty_in_stock"),
                    resultSet.getInt("qty_on_loan"),
                    resultSet.getString("type"),
                    resultSet.getString("artist"),
                    resultSet.getString("label"),
                    resultSet.getString("release_date"),
                    resultSet.getString("asin")
            );

            music.setId(resultSet.getInt("id"));

                musicArrayList.add(music);
            }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        } finally {
            connector.close();
        }
        return musicArrayList;
    }

    public static void insert(Music music){
        //check for conditions
        music.setQtyInStock(1);
        String columnName = "qty_in_stock, qty_on_loan, title, artist, asin, label, release_date, type";
        String values= music.getQtyInStock()+ ", "+ music.getQtyOnLoan()+ ", '" + music.getTitle()+"', '"+ music.getArtist() + "', '" + music.getAsin() + "', '" + music.getLabel() + "', '" + music.getReleaseDate() + "', '" +music.getType()+"'";
        
        String query = "INSERT INTO testdb.music (" + columnName + ") VALUES (" + values + ")";
        System.out.println(query);
        try{
            DbConnection.update(query);

        }catch(Exception e){
            e.printStackTrace();
        }

    }

}

