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

}
