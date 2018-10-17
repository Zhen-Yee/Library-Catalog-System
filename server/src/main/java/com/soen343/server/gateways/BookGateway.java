package com.soen343.server.gateways;

import com.soen343.server.models.catalog.Book;

import java.sql.*;
import java.util.ArrayList;

public class BookGateway {

    // replace with property calls
    private static final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String USERNAME = "test";
    private static final String PASSWORD = "testtest";

    public static ArrayList<Book> findAll() {
        return null;
    }

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

            // Add movie, get the new id
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

    public static void delete(long id) {
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            stmt.executeUpdate("DELETE FROM testdb.book WHERE id=" + id);

            conn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    public static void update(Book book) {
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            stmt.executeUpdate("UPDATE testdb.book SET qty_in_stock = " + book.getQtyInStock() + ", qty_on_load = " + book.getQtyOnLoan() + ", title = " + book.getTitle() + 
            ", author = " + book.getAuthor() + ", format = " + book.getFormat() + ", isbn10 = " + book.getIsbn10() + ", isbn13 = " + book.getIsbn13() + 
            ", language = " + book.getLanguage() + ", pages = " + book.getPages() + ", publisher = " + book.getPublisher() + 
            ", year_of_publication = " + book.getYearOfPublication() + " WHERE id = " + book.getId());
            
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
}
