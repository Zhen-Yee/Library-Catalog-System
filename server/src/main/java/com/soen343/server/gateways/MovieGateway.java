package com.soen343.server.gateways;

import com.soen343.server.models.catalog.Movie;
import com.soen343.server.models.SearchCriteria;
import com.soen343.server.models.catalog.CatalogItem;
import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;

import java.sql.*;
import java.util.*;

public class MovieGateway {

    private static MovieGateway movieGateway = null;

    private  Connector connector;

    // replace with property calls
    private final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private final String USERNAME = "test";
    private final String PASSWORD = "testtest";

    private final String SQL_GET_ALL_MOVIES = "SELECT  * from testdb.movie";

    /**
     * Singleton pattern - allows instantiation
     * of MovieGateway
     * @return {@link MovieGateway}
     */
    public static MovieGateway getMovieGateway() {
        if(movieGateway == null) {
            movieGateway = new MovieGateway();
        }
        return movieGateway;
    }

    /**
     * Inserts a {@link Movie} CatalogItem to the database
     * This method  checks if it already exist or not.
     * If it does increment the quantity.
     * @param movie: Movie CatalogItem
     */
    public void insert(Movie movie){
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

            // give the model the generate id (just in case)

            movie.setId(id);
            // use movie id to populate the actor, producer, dub, sub tables
            for (String actor : movie.getActors() ) {
                stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, actor) VALUES (" + id + ", '" + actor + "')");
            }
            for (String producer : movie.getProducers() ) {
                stmt.executeUpdate("INSERT INTO testdb.producer (movie_id, producer) VALUES (" + id + ", '" + producer + "')");
            }
            for (String sub : movie.getSubtitles() ) {
                stmt.executeUpdate("INSERT INTO testdb.subtitle (movie_id, sub_language) VALUES (" + id + ", '" + sub + "')");
            }
            for (String dub : movie.getDubs() ) {
                stmt.executeUpdate("INSERT INTO testdb.dub (movie_id, dub_language) VALUES (" + id + ", '" + dub + "')");
            }

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    /**
     * Query all {@link Movie} from the database
     * @return
     */
    public List<Movie> getAll(){
        List<Movie> movieArrayList = new ArrayList<>();

        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            stmt.executeQuery("SELECT  * from testdb.movie");
            ResultSet movieResultSet = stmt.getResultSet();
            while (movieResultSet.next()) {
                // creates 1 movie
                Movie movie = new Movie(
                    movieResultSet.getString("title"),
                    movieResultSet.getInt("qty_in_stock"),
                    movieResultSet.getInt("qty_on_loan"),
                    movieResultSet.getString("director"),
                    movieResultSet.getString("language"),
                    movieResultSet.getString("release_date"),
                    movieResultSet.getInt("run_time")
            );
            // takes the id of that movie to find actors, subs, dubs, producers
            int movieId = movieResultSet.getInt("id");
            movie.setId(movieId);
            // finds actors and adds it to the movie
            Statement stmt2 = conn.createStatement();
            stmt2.executeQuery("SELECT  * from testdb.actor WHERE movie_id ='"+ movieId + "'");
            ResultSet actorResultSet = stmt2.getResultSet();
            // movieResultSet = connector.getResultSet();
            while(actorResultSet.next()){
            movie.addActors(actorResultSet.getString("actor"));
            }

            // finds subtitles and adds it to the movie
            Statement stmt3 = conn.createStatement();
            stmt3.executeQuery("SELECT  * from testdb.subtitle WHERE movie_id ='"+ movieId + "'");
            ResultSet subsResultSet = stmt3.getResultSet();
            // movieResultSet = connector.getResultSet();
            while(subsResultSet.next()){
            movie.addSubtitles(subsResultSet.getString("sub_language"));
            }

            // finds dubs and adds it to the movie
            Statement stmt4 = conn.createStatement();
            stmt4.executeQuery("SELECT  * from testdb.dub WHERE movie_id ='"+ movieId + "'");
            ResultSet dubsResultSet = stmt4.getResultSet();
            //movieResultSet = connector.getResultSet();
            while(dubsResultSet.next()){
            movie.addDubs(dubsResultSet.getString("dub_language"));
            }

            // finds producer and adds it to the movie
            Statement stmt5 = conn.createStatement();
            stmt5.executeQuery("SELECT  * from testdb.producer WHERE movie_id ='"+ movieId + "'");
            ResultSet producerResultSet = stmt5.getResultSet();
           // movieResultSet = connector.getResultSet();
            while(producerResultSet.next()){
            movie.addProducers(producerResultSet.getString("producer"));
            }

            movieArrayList.add(movie);
            }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        } finally {
            // connector.close();
        }
        return movieArrayList;
    }

    /**
     * Deletes a Movie from the Database
     * @param movie
     */
    public void delete(Movie movie) {
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            stmt.executeUpdate("DELETE FROM testdb.movie WHERE id=" + movie.getId());
            stmt.executeUpdate("DELETE FROM testdb.actor WHERE movie_id=" + movie.getId());
            stmt.executeUpdate("DELETE FROM testdb.producer WHERE movie_id=" + movie.getId());
            stmt.executeUpdate("DELETE FROM testdb.subtitle WHERE movie_id=" + movie.getId());
            stmt.executeUpdate("DELETE FROM testdb.dub WHERE movie_id=" + movie.getId());

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    /**
     * Updates a {@link Movie} CatalogItem in the database
     * @param movie
     */
    public void update(Movie movie){
        try{
        Connection conn = connect();
        Statement stmt = conn.createStatement();
        String movieQuery = "UPDATE testdb.movie SET qty_in_stock = '" + movie.getQtyInStock() + "', qty_on_loan = '" + movie.getQtyOnLoan() + "', title = '" + movie.getTitle() + 
            "', director = '" + movie.getDirector() + "', language = '" + movie.getLanguage() + "', release_date = '" + movie.getReleaseDate() + "', run_time = '" + movie.getRunTime() + 
            "'WHERE id = " + movie.getId();
        // updated movie parameters without actors, dubs, subs and producers
        stmt.executeUpdate(movieQuery);
    
        // delete actors for that movie
        String deleteActors = "DELETE FROM testdb.actor WHERE movie_id = '"+ movie.getId()+"'";
        stmt.executeUpdate(deleteActors);
        // add each incoming actors to the db for that movie
        for(String actor: movie.getActors()){
            stmt.executeUpdate("INSERT INTO testdb.actor (movie_id, actor) VALUES (" + movie.getId() + ", '" + actor + "')");
        }

        // delete subs for that movie
        String deleteSubs = "DELETE FROM testdb.subtitle WHERE movie_id = '"+ movie.getId()+"'";
        stmt.executeUpdate(deleteSubs);
        // add each incoming subs to the db for that movie
        for(String subs: movie.getSubtitles()){
            stmt.executeUpdate("INSERT INTO testdb.subtitle (movie_id, sub_language) VALUES (" + movie.getId() + ", '" + subs + "')");
        }

        // delete dubs for that movie
        String deleteDubs = "DELETE FROM testdb.dub WHERE movie_id = '"+ movie.getId()+"'";
        stmt.executeUpdate(deleteDubs);
        // add each incoming dubs to the db for that movie
        for(String dubs: movie.getDubs()){
            stmt.executeUpdate("INSERT INTO testdb.dub (movie_id, dub_language) VALUES (" + movie.getId() + ", '" + dubs + "')");
        }

        // delete producers for that movie
        String deleteProducers = "DELETE FROM testdb.producer WHERE movie_id = '"+ movie.getId()+"'";
        stmt.executeUpdate(deleteProducers);
        // add each incoming subs to the db for that movie
        for(String producer: movie.getProducers()){
            stmt.executeUpdate("INSERT INTO testdb.producer (movie_id, producer) VALUES (" + movie.getId() + ", '" + producer + "')");
        }
        conn.close();
        } catch(Exception e){
            System.out.println(e);
        }
        
    }

    // change for a DataSource later?
    private Connection connect(){
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

    /**
     * Helper method that builds the String for search query
     * Checks each parameter to build a SQL database query string
     * @param search: SearchCriteria
     * @return String
     */
    public String buildFilterString(SearchCriteria search){
        
        int i = 0;
        if(search.getTitle().equals("title")){
            i++;
        } 
        if(search.getDirector().equals("director")){
            i++;
        } 
        if(search.getLanguage().equals("language")){
            i++;
        } 
        if(search.getReleaseDate().equals("releasedate")){
            i++;
        } 
        
        String filter = "SELECT * from testdb.movie WHERE";
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
        if(search.getDirector().equals("director")){
            i--; 
            filter += " director LIKE '%" + search.getSearch() + "%'";
            if(i>0){

                filter += " OR"; 
                 
            }
        }
        if(search.getLanguage().equals("language")){
            i--;
            filter += " language LIKE '%" + search.getSearch() + "%'";
            if(i>0){
                filter +=" OR";
                
            }
        }
        if(search.getReleaseDate().equals("releaseDate")){
           
            filter += " releaseDate LIKE '%" + search.getSearch() + "%'";
           
        }
        System.out.println("END " + filter);
        return filter;
    }

    public List<Integer> populateActorId(SearchCriteria search) {
        List<Integer> actorIdList = new ArrayList<>();
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            ResultSet actorSet = stmt.executeQuery("SELECT * from testdb.actor WHERE actor LIKE '%" + search.getSearch() + "%'");
            System.out.println("passed first query");
            while(actorSet.next()){
                actorIdList.add(actorSet.getInt("movie_id"));
            }
        } catch(SQLException e) {
            System.out.println(e);
        }
        Set<Integer> actorId = new HashSet<>();
        actorId.addAll(actorIdList);
        actorIdList.clear();
        actorIdList.addAll(actorId);
        return actorIdList;
    }

     public List<Integer> populateProducerId(SearchCriteria search) {
        List<Integer> producerIdList = new ArrayList<>();
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            ResultSet producerSet = stmt.executeQuery("SELECT * from testdb.producer WHERE producer LIKE '%" + search.getSearch() + "%'");
            System.out.println("passed first query");
            while(producerSet.next()){
                producerIdList.add(producerSet.getInt("movie_id"));
            }
        } catch(SQLException e) {
            System.out.println(e);
        }
        Set<Integer> producerId = new HashSet<>();
        producerId.addAll(producerIdList);
        producerIdList.clear();
        producerIdList.addAll(producerId);

        return producerIdList;
    }

    /**
     * Search database based on {@link SearchCriteria}
     * Creates a MagazineArrayList
     * @param search: SearchCriteria
     * @return MagazineArrayList
     */
    public List<Movie> search(SearchCriteria search){
        System.out.println("entered movie gateway");
        List<Movie> movieArrayList = new ArrayList<>();
        List<Integer> actorIdList = new ArrayList<>();
        List<Integer> producerIdList = new ArrayList<>();

        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            if(search.getProducers().equals("producers")){
               producerIdList = populateProducerId(search);
               for(int i=0; i<producerIdList.size(); i++){
                String query = "SELECT * from testdb.movie WHERE id ='"+ producerIdList.get(i) + "'";
                stmt.executeQuery(query);
                System.out.print("passed second query");
                ResultSet movieResultSet = stmt.getResultSet();
                while (movieResultSet.next()) {
                    // creates 1 movie
                    Movie movie = new Movie(
                        movieResultSet.getString("title"),
                        movieResultSet.getInt("qty_in_stock"),
                        movieResultSet.getInt("qty_on_loan"),
                        movieResultSet.getString("director"),
                        movieResultSet.getString("language"),
                        movieResultSet.getString("release_date"),
                        movieResultSet.getInt("run_time")
                );
                // takes the id of that movie to find actors, subs, dubs, producers
                int movieId = movieResultSet.getInt("id");
                movie.setId(movieId);
                // finds actors and adds it to the movie
                Statement stmt2 = conn.createStatement();
                stmt2.executeQuery("SELECT  * from testdb.actor WHERE movie_id ='"+ movieId + "'");
                ResultSet actorResultSet = stmt2.getResultSet();
                // movieResultSet = connector.getResultSet();
                while(actorResultSet.next()){
                movie.addActors(actorResultSet.getString("actor"));
                }
    
                // finds subtitles and adds it to the movie
                Statement stmt3 = conn.createStatement();
                stmt3.executeQuery("SELECT  * from testdb.subtitle WHERE movie_id ='"+ movieId + "'");
                ResultSet subsResultSet = stmt3.getResultSet();
                // movieResultSet = connector.getResultSet();
                while(subsResultSet.next()){
                movie.addSubtitles(subsResultSet.getString("sub_language"));
                }
    
                // finds dubs and adds it to the movie
                Statement stmt4 = conn.createStatement();
                stmt4.executeQuery("SELECT  * from testdb.dub WHERE movie_id ='"+ movieId + "'");
                ResultSet dubsResultSet = stmt4.getResultSet();
                //movieResultSet = connector.getResultSet();
                while(dubsResultSet.next()){
                movie.addDubs(dubsResultSet.getString("dub_language"));
                }
    
                // finds producer and adds it to the movie
                Statement stmt5 = conn.createStatement();
                stmt5.executeQuery("SELECT  * from testdb.producer WHERE movie_id ='"+ movieId + "'");
                ResultSet producerResultSet = stmt5.getResultSet();
               // movieResultSet = connector.getResultSet();
                while(producerResultSet.next()){
                movie.addProducers(producerResultSet.getString("producer"));
                }
    
                movieArrayList.add(movie);
                }
             }
            }

            if(search.getActors().equals("actors")){
                actorIdList = populateActorId(search);
                for(int i=0; i<actorIdList.size(); i++){
                   String query = "SELECT * from testdb.movie WHERE id ='"+ actorIdList.get(i) + "'";
                
                if(!producerIdList.isEmpty()){
                if(actorIdList.contains(producerIdList.get(i))){
                      break;
                  }
                }
                   stmt.executeQuery(query);
        System.out.print("passed second query");
                   ResultSet movieResultSet = stmt.getResultSet();
                   while (movieResultSet.next()) {
                       // creates 1 movie
                       Movie movie = new Movie(
                           movieResultSet.getString("title"),
                           movieResultSet.getInt("qty_in_stock"),
                           movieResultSet.getInt("qty_on_loan"),
                           movieResultSet.getString("director"),
                           movieResultSet.getString("language"),
                           movieResultSet.getString("release_date"),
                           movieResultSet.getInt("run_time")
                   );
                   // takes the id of that movie to find actors, subs, dubs, producers
                   int movieId = movieResultSet.getInt("id");
                   movie.setId(movieId);
                   // finds actors and adds it to the movie
                   Statement stmt2 = conn.createStatement();
                   stmt2.executeQuery("SELECT  * from testdb.actor WHERE movie_id ='"+ movieId + "'");
                   ResultSet actorResultSet = stmt2.getResultSet();
                   // movieResultSet = connector.getResultSet();
                   while(actorResultSet.next()){
                   movie.addActors(actorResultSet.getString("actor"));
                   }
       
                   // finds subtitles and adds it to the movie
                   Statement stmt3 = conn.createStatement();
                   stmt3.executeQuery("SELECT  * from testdb.subtitle WHERE movie_id ='"+ movieId + "'");
                   ResultSet subsResultSet = stmt3.getResultSet();
                   // movieResultSet = connector.getResultSet();
                   while(subsResultSet.next()){
                   movie.addSubtitles(subsResultSet.getString("sub_language"));
                   }
       
                   // finds dubs and adds it to the movie
                   Statement stmt4 = conn.createStatement();
                   stmt4.executeQuery("SELECT  * from testdb.dub WHERE movie_id ='"+ movieId + "'");
                   ResultSet dubsResultSet = stmt4.getResultSet();
                   //movieResultSet = connector.getResultSet();
                   while(dubsResultSet.next()){
                   movie.addDubs(dubsResultSet.getString("dub_language"));
                   }
       
                   // finds producer and adds it to the movie
                   Statement stmt5 = conn.createStatement();
                   stmt5.executeQuery("SELECT  * from testdb.producer WHERE movie_id ='"+ movieId + "'");
                   ResultSet producerResultSet = stmt5.getResultSet();
                  // movieResultSet = connector.getResultSet();
                   while(producerResultSet.next()){
                   movie.addProducers(producerResultSet.getString("producer"));
                   }
       
                   movieArrayList.add(movie);
                   }
                }
            }


            if(search.getTitle().equals("title") ||
            search.getDirector().equals("director") ||
            search.getLanguage().equals("language") ||
            search.getReleaseDate().equals("releaseDate")){
            String filter = buildFilterString(search);
           
            stmt.executeQuery(filter);
            ResultSet movieResultSet = stmt.getResultSet();
            while (movieResultSet.next()) {
                // creates 1 movie
                Movie movie = new Movie(
                    movieResultSet.getString("title"),
                    movieResultSet.getInt("qty_in_stock"),
                    movieResultSet.getInt("qty_on_loan"),
                    movieResultSet.getString("director"),
                    movieResultSet.getString("language"),
                    movieResultSet.getString("release_date"),
                    movieResultSet.getInt("run_time")
            );
            // takes the id of that movie to find actors, subs, dubs, producers
            int movieId = movieResultSet.getInt("id");
            movie.setId(movieId);
            // finds actors and adds it to the movie
            Statement stmt2 = conn.createStatement();



            stmt2.executeQuery("SELECT  * from testdb.actor WHERE movie_id ='"+ movieId + "'");
            ResultSet actorResultSet = stmt2.getResultSet();
            // movieResultSet = connector.getResultSet();
            while(actorResultSet.next()){
            movie.addActors(actorResultSet.getString("actor"));
            }

            // finds subtitles and adds it to the movie
            Statement stmt3 = conn.createStatement();
            stmt3.executeQuery("SELECT  * from testdb.subtitle WHERE movie_id ='"+ movieId + "'");
            ResultSet subsResultSet = stmt3.getResultSet();
            // movieResultSet = connector.getResultSet();
            while(subsResultSet.next()){
            movie.addSubtitles(subsResultSet.getString("sub_language"));
            }

            // finds dubs and adds it to the movie
            Statement stmt4 = conn.createStatement();
            stmt4.executeQuery("SELECT  * from testdb.dub WHERE movie_id ='"+ movieId + "'");
            ResultSet dubsResultSet = stmt4.getResultSet();
            //movieResultSet = connector.getResultSet();
            while(dubsResultSet.next()){
            movie.addDubs(dubsResultSet.getString("dub_language"));
            }

            // finds producer and adds it to the movie
            Statement stmt5 = conn.createStatement();
            stmt5.executeQuery("SELECT  * from testdb.producer WHERE movie_id ='"+ movieId + "'");
            ResultSet producerResultSet = stmt5.getResultSet();
           // movieResultSet = connector.getResultSet();
            while(producerResultSet.next()){
            movie.addProducers(producerResultSet.getString("producer"));
            }

            movieArrayList.add(movie);
            }
        }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        } finally {
            // connector.close();
        }
        return movieArrayList;
    }

    public Movie get(int id){
        String SQL_GET_ID = "SELECT  * from testdb.movie WHERE id = '" + id + "'";
        connector = DbConnection.get(SQL_GET_ID);
        ResultSet resultSet = connector.getResultSet();
        return buildResultSet(resultSet);
        
    }

    private Movie buildResultSet(ResultSet resultSet) {
        Movie movie = null;
        try {
            while (resultSet.next()) {

                // Creates object for each row in database movie table
                movie = new Movie(
                    resultSet.getString("title"),
                    resultSet.getInt("qty_in_stock"),
                    resultSet.getInt("qty_on_loan"),
                    resultSet.getString("director"),
                    resultSet.getString("language"),
                    resultSet.getString("release_date"),
                    resultSet.getInt("run_time")
                );

                movie.setId(resultSet.getInt("id"));

            }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        } finally {
            connector.close();
        }
        return movie;
    }
}
