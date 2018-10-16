package com.soen343.server.gateways;

import com.soen343.server.models.catalog.Movie;

import java.sql.*;

public class MovieGateway {

    // replace with property calls
    private static final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String USERNAME = "test";
    private static final String PASSWORD = "testtest";

    public static ResultSet findAll() {
        return null;
    }

    public static void insert(Movie movie){
        // generate the query
        String columns = "qty_in_stock, qty_on_loan, title, director, language, release_date, run_time";
        String values = movie.getQtyInStock() + ", " + movie.getQtyOnLoan() + ", '" + movie.getTitle() + "', '"
                + movie.getDirector() + "', '" + movie.getLanguage() + "', '" + movie.getReleaseDate() + "', " + movie.getRunTime();
        String query = "INSERT INTO testdb.movie (" + columns + ") VALUES (" + values + ")";
        System.out.println("INSERT QUERY: " + query);

        try {
            // Connect to DB
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            // Add movie, get the new id
            stmt.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
            ResultSet keys = stmt.getGeneratedKeys();
            long id = 0;
            while (keys.next()){
                id = keys.getLong(1);
            }

            // use movie id to populate the actor, producer, dub, sub tables
            // add actors
            for (String actor : movie.getActors() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, actor) VALUES (" + id + ", '" + actor + "'");
            }
            // add producers
            for (String producer : movie.getProducers() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, producer) VALUES (" + id + ", '" + producer + "'");
            }
            // add subtitles
            for (String sub : movie.getSubtitles() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, sub_language) VALUES (" + id + ", '" + sub + "'");
            }
            // add dubs
            for (String dub : movie.getDubs() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, dub_language) VALUES (" + id + ", '" + dub + "'");
            }

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    public static void update(Movie movie){

    }

    public static void delete(Long id) {

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
