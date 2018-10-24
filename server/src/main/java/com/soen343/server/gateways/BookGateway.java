package com.soen343.server.gateways;
import java.sql.*;
import java.util.ArrayList;
import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Book;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.swing.plaf.basic.BasicTreeUI.CellEditorHandler;

public class BookGateway {
    
    private static Connector connector;

    // replace with property calls
    private static final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private static final String USERNAME = "test";
    private static final String PASSWORD = "testtest";
    //language=SQL
    private static final String SQL_GET_ALL_BOOKS = "SELECT  * from testdb.book";

    public static void insert(Book book){

        if (checkIfBookExists(book.getTitle(), book.getAuthor())){
            int QtyStock = (getQty(book.getTitle(),book.getAuthor()) + 1);
            String query = "UPDATE testdb.book SET qty_in_stock = " + QtyStock + " WHERE title = '" + book.getTitle() + "' AND artist = '" + book.getAuthor() + "'";
            System.out.println(query);
            try{
                DbConnection.update(query);
            } catch(Exception e){
                e.printStackTrace();
            }
        }
        else {
        book.setQtyInStock(1);
        //generate query
        String columns = "qty_in_stock, qty_on_loan, title, author, format, isbn10, isbn13, language, pages, publisher, year_of_publication";
        String values = "'" + book.getQtyInStock() + "','" + book.getQtyOnLoan() + "', '" + book.getTitle() + "', '"
                + book.getAuthor() + "', '" + book.getFormat() + "', '" + book.getIsbn10() + "', '" 
                + book.getIsbn13()+ "', '" + book.getLanguage() + "', " + book.getPages() + ", '" 
                + book.getPublisher() + "', " + book.getYearOfPublication();
        String query = "INSERT INTO testdb.book (" + columns + ") VALUES (" + values + ")";
        System.out.println("INSERT QUERY: " + query);

        try {
            //connect to DB
            Connection conn = connect();
            Statement stmt = conn.createStatement();

            //add book and get new id
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
}

    public static boolean checkIfBookExists(String title, String author){
        boolean check = false;
        try{
            String query = "SELECT * FROM testdb.book WHERE title = '" + title + "' AND author = '" + author + "'";
            connector = DbConnection.get(query);
            ResultSet r = connector.getResultSet();
            
            if (r.next() == true){
                check = true;
            }
            connector.close();
        } catch (Exception e){
            e.printStackTrace();
        }
        return check;
    }

    public static int getQty(String title, String author) {
        int qtyStock = 0;
        try {
            String query = "SELECT * FROM testdb.book WHERE title = '" + title + "' AND author = '" + author + "'";
            connector = DbConnection.get(query);
            ResultSet r = connector.getResultSet();
            if (r.next()){
                qtyStock = r.getInt("qty_in_stock");
            }
            connector.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return qtyStock;
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
