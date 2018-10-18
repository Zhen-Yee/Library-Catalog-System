package com.soen343.server.gateways;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Music;

import java.sql.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MusicGateway {

    private static Connector connector;

    //language=SQL
    private static final String SQL_GET_ALL_MUSICS = "SELECT  * from testdb.music";

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
                musicArrayList.add(new Music(
                        resultSet.getString("title"),
                        resultSet.getInt("qty_in_stock"),
                        resultSet.getInt("qty_on_loan"),
                        resultSet.getString("type"),
                        resultSet.getString("artist"),
                        resultSet.getString("label"),
                        resultSet.getString("release_date"),
                        resultSet.getString("asin")
                ));
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

}

