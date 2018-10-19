package com.soen343.server.gateways;
import java.sql.*;
import java.util.ArrayList;
import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Book;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class BookGateway {
    
    private static Connector connector;

    // replace with property calls
    private static final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String USERNAME = "test";
    private static final String PASSWORD = "testtest";
    //language=SQL
    private static final String SQL_GET_ALL_BOOKS = "SELECT  * from testdb.book";

    public static void insert(Book book){
        // generate the query
        String columns = "qty_in_stock, qty_on_loan, title, author, format, isbn10, isbn13, language, pages, publisher, year_of_publication";
        String values = book.getQtyInStock() + ", " + book.getQtyOnLoan() + ", '" + book.getTitle() + "', '"
                + book.getAuthor() + "', '" + book.getFormat() + "', '" + book.getIsbn10() + "', " + book.getIsbn13()+ "', '" + book.getLanguage() + "', '" + book.getPages() + "', '" + book.getPublisher() + "', '" + book.getYearOfPublication();
        String query = "INSERT INTO testdb.book (" + columns + ") VALUES (" + values + ")";
        System.out.println("INSERT QUERY: " + query);

        try {
            // Connect to DB
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            // Add book, get the new id
            stmt.executeUpdate(query, Statement.RETURN_GENERATED_KEYS);
            ResultSet keys = stmt.getGeneratedKeys();
            long id = 0;
            while (keys.next()){
                id = keys.getLong(1);
            }

            // give the model the generate id (just in case)

            book.setId(id);

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    // public static void delete(long id) {
    //     try {
    //         Connection conn = connect();
    //         Statement stmt = conn.createStatement();

    //         stmt.executeUpdate("DELETE FROM testdb.book WHERE id=" + id);

    //         conn.close();
    //     } catch (Exception e) {
    //         System.out.println(e);
    //     }

    // }

    public static void delete(Book book){
        try{
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            
            
            if(book.getQtyInStock() == 0){
                String query = "DELETE FROM testdb.book WHERE id=" + book.getId();
                stmt.executeUpdate(query);
            }
            else{
                update(book);
            }
        }
        catch(Exception e){
        
        }
    }

    public static void update(Book book) {
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            // SQL QUERY STATEMENT
            String query = "UPDATE testdb.book SET qty_in_stock = '" + book.getQtyInStock() + "', qty_on_loan = '" + book.getQtyOnLoan() + "', title = '" + book.getTitle() + 
            "', author = '" + book.getAuthor() + "', format = '" + book.getFormat() + "', isbn10 = '" + book.getIsbn10() + "', isbn13 = '" + book.getIsbn13() + 
            "', language = '" + book.getLanguage() + "', pages = '" + book.getPages() + "', publisher = '" + book.getPublisher() + 
            "', year_of_publication = '" + book.getYearOfPublication() + "' WHERE id = " + book.getId() ;

            stmt.executeUpdate(query);
            
            conn.close();
            
        } catch (Exception e) {
            System.out.println(e);
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

                // Creates object for each row in database book table
                Book book = new Book(
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
            );

            book.setId(resultSet.getInt("id"));

                bookArrayList.add(book);
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
