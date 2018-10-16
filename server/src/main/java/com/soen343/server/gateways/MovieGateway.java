package com.soen343.server.gateways;

import com.soen343.server.models.catalog.Movie;

import java.sql.*;
import java.util.ArrayList;

public class MovieGateway {

    // replace with property calls
    private static final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String USERNAME = "test";
    private static final String PASSWORD = "testtest";

    public static ArrayList<Movie> findAll() {
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
            for (String actor : movie.getActors() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, actor) VALUES (" + id + ", '" + actor + "'");
            }
            for (String producer : movie.getProducers() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, producer) VALUES (" + id + ", '" + producer + "'");
            }
            for (String sub : movie.getSubtitles() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, sub_language) VALUES (" + id + ", '" + sub + "'");
            }
            for (String dub : movie.getDubs() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, dub_language) VALUES (" + id + ", '" + dub + "'");
            }

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    public static void delete(Long id) {
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            stmt.executeUpdate("DELETE FROM testdb.movie WHERE id=" + id);
            stmt.executeUpdate("DELETE FROM testdb.actor WHERE movie_id=" + id);
            stmt.executeUpdate("DELETE FROM testdb.producer WHERE movie_id=" + id);
            stmt.executeUpdate("DELETE FROM testdb.subtitle WHERE movie_id=" + id);
            stmt.executeUpdate("DELETE FROM testdb.dub WHERE movie_id=" + id);

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

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
