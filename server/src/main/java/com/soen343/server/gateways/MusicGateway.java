package com.soen343.server.gateways;
import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.SearchCriteria;
import com.soen343.server.models.catalog.Music;
import java.sql.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MusicGateway {

    private static MusicGateway musicGateway = null;

    private Connector connector;

    //language=SQL
    private final String SQL_GET_ALL_MUSICS = "SELECT  * from testdb.music";

    /**
     * Singleton pattern - allows instantiation
     * of MusicGateway
     * @return {@link MusicGateway}
     */
    public static MusicGateway getMusicGateway() {
        if(musicGateway == null) {
            musicGateway = new MusicGateway();
        }
        return musicGateway;
    }

    /**
     * Updates a {@link Music} CatalogItem in the database
     * @param music
     */
    public void update(Music music) {
        try {
            // SQL QUERY STATEMENT 
            String query = "UPDATE testdb.music SET qty_in_stock = '" + music.getQtyInStock() + "', qty_on_loan = '" + music.getQtyOnLoan() + "', title = '" + music.getTitle() +
                    "', artist = '" + music.getArtist() + "', asin = '" + music.getAsin() + "', label = '" + music.getLabel() + "', release_date = '" + music.getReleaseDate() +
                    "', type = '" + music.getType() + "' WHERE id = " + music.getId() ;
            System.out.println(query);
            // Pass in SQL statement to DbConnection update function to execute query
            DbConnection.update(query);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Query all {@link Music} from the database
     * @return List<Music>
     */
    public List<Music> getAll() {
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

    /**
     * Inserts a {@link Music} CatalogItem to the database
     * This method  checks if it already exist or not.
     * If it does increment the quantity.
     * @param music: Music CatalogItem
     */
    public void insert(Music music){
        if(checkIfMusicExists(music.getTitle(), music.getArtist())){
            int QtyStock=(getQty(music.getTitle(), music.getArtist()) + 1);
            String query="UPDATE testdb.music SET qty_in_stock = " + QtyStock + " WHERE title = '" + music.getTitle() + "' AND artist = '" + music.getArtist() + "'";
            System.out.println(query);
            //System.out.println(music.getQtyInStock() + 1);
            try{
                DbConnection.update(query);
            }catch(Exception e){
                e.printStackTrace();
            }
        }else{
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

    /**
     * Helper method that checks if the music already exist
     * in the database.
     * @param title: the title of the music
     * @param artist: the artist of the music
     * @return boolean - True if the music exist; False if it doesn't,
     */
    public boolean checkIfMusicExists(String title, String artist){
        boolean check=false;
        try{
            String query="SELECT * FROM testdb.music WHERE title = '" + title + "' AND artist = '" + artist + "'";
            connector=DbConnection.get(query);
            ResultSet r=connector.getResultSet();
            if(r.next()==true){
                check=true;
            }
            connector.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        return check;
    }

    /**
     *  Helper method that gets the quantity of the queried music.
     * @param title: the title of the music
     * @return
     */
    public int getQty(String title, String artist){
        int qtyStock=0;
        try{
            String query="SELECT * FROM testdb.music WHERE title = '" + title + "' AND artist = '" + artist + "'";
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

    /**
     * Deletes a Music from the Database
     * @param music
     */
    public void delete(Music music){
        try{
            String query = "DELETE FROM testdb.music WHERE id=" + music.getId();
            DbConnection.update(query);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }

    /**
     * Helper method that builds the String for search query
     * Checks each parameter to build a SQL database query string
     * @param search: SearchCriteria
     * @return String
     */
    public String buildFilterString(SearchCriteria search){
        System.out.println(search);

        int i = 0;
        if(search.getTitle().equals("title")){
            i++;
        }
        if(search.getType().equals("type")){
            i++;
        }
        if(search.getArtist().equals("artist")){
            i++;
        }
        if(search.getLabel().equals("label")){
            i++;
        }
        if(search.getLabel().equals("releaseDate")){
            i++;
        }
        if(search.getLabel().equals("asin")){
            i++;
        }

        String filter = "SELECT * from testdb.music WHERE";
        System.out.println(filter);
        System.out.println("number of filters " + i);
        if(search.getTitle().equals("title")){
            i--;
            System.out.println(filter);

            filter += " title LIKE '%" + search.getSearch() + "%'";
            if(i>0){

                filter += " OR";

            }
        }
        if(search.getType().equals("type")){
            i--;

            filter += " type LIKE '%" + search.getSearch() + "%'";
            if(i>0){

                filter += " OR";

            }
        }
        if(search.getArtist().equals("artist")){
            i--;

            filter += " artist LIKE '%" + search.getSearch() + "%'";
            if(i>0){
                filter +=" OR";

            }
        }
        if(search.getLabel().equals("label")){
            i--;

            filter += " label LIKE '%" + search.getSearch() + "%'";
            if(i>0){
                filter += " OR";

            }
        }
        if(search.getLabel().equals("releaseDate")){
            i--;

            filter += " releaseDate LIKE '%" + search.getSearch() + "%'";
            if(i>0){
                filter += " OR";

            }
        }
        if(search.getLabel().equals("asin")){

            filter += " asin LIKE '%" + search.getSearch() + "%'";

        }
        System.out.println("END " + filter);
        return filter;
    }

    /**
     * Search database based on {@link SearchCriteria}
     * Creates a MagazineArrayList.
     * @param search: SearchCriteria
     * @return MagazineArrayList
     */
    public List<Music> search(SearchCriteria search){
        System.out.print("Entered gateway");
        List<Music> musicArrayList = new ArrayList<>();

        if(search.getTitle().equals("title") ||
                search.getType().equals("type") ||
                search.getArtist().equals("artist") ||
                search.getLabel().equals("label") ||
                search.getReleaseDate().equals("releaseDate") ||
                search.getAsin().equals("asin")){

            String filter = buildFilterString(search);
            connector = DbConnection.get(filter);
            ResultSet resultSet = connector.getResultSet();
            try {
                while (resultSet.next()) {

                    // Creates object for each row in database music table
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
        }
        return musicArrayList;
    }

    public Music get(int id){
        String SQL_GET_ID = "SELECT  * from testdb.music WHERE id = '" + id + "'";
        connector = DbConnection.get(SQL_GET_ID);
        ResultSet resultSet = connector.getResultSet();
        return buildResultSet(resultSet);
    }

    public Music buildResultSet(ResultSet resultSet){
        Music music= null;
        try {
            while (resultSet.next()) {

                // Creates object for each row in database music table
                music = new Music(
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
            }

        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        } finally {
            connector.close();
        }
        return music;
    }

}