package com.soen343.server.gateways;

import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Movie;
import java.sql.ResultSet;

public class MovieGateway {

    private static final String TABLE = "testdb.movie";

    public static ResultSet findAll() {
        return null;
    }

    public static void insert(Movie movie){
        String columns = "qty_in_stock, qty_on_loan, title, director, language, release_date, run_time";
        String values = movie.getQtyInStock() + ", " + movie.getQtyOnLoan() + ", '" + movie.getTitle() + "', '"
                + movie.getDirector() + "', '" + movie.getLanguage() + "', '" + movie.getReleaseDate() + "', " + movie.getRunTime();

        String query = "INSERT INTO testdb.movie (" + columns + ") VALUES (" + values + ")";
        System.out.println(query);
        DbConnection.update(query);

    }

    public static void update(Movie movie){

    }

    public static void delete(Movie movie) {

    }
}
