package com.soen343.server.gateways;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Book;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BookGateway {

    private static Connector connector;

    //language=SQL
    private static final String SQL_GET_ALL_BOOKS = "SELECT  * from testdb.book";

    /**
     * Query all {@link Book} from the database
     * @return
     */
    public static List<Book> getAll() {
        List<Book> bookArrayList = new ArrayList<>();
        connector = DbConnection.get(SQL_GET_ALL_BOOKS);
        ResultSet resultSet = connector.getResultSet();

        try {
            while (resultSet.next()) {
                bookArrayList.add(new Book(
                        resultSet.getString("title"),
                        resultSet.getInt("qty_in_stock"),
                        resultSet.getInt("qty_on_loan"),
                        resultSet.getString("author"),
                        resultSet.getString("format"),
                        resultSet.getInt("pages"),
                        resultSet.getInt("year_of_publication"),
                        resultSet.getString("publisher"),
                        resultSet.getString("language"),
                        resultSet.getString("isbn10"),
                        resultSet.getString("isbn13")
                ));
            }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        } finally {
            connector.close();
        }
        return bookArrayList;
    }

}
