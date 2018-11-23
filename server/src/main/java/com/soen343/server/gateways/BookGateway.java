package com.soen343.server.gateways;
import java.sql.*;
import java.util.ArrayList;
import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.SearchCriteria;
import com.soen343.server.models.catalog.Book;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;


public class BookGateway {

    private static BookGateway bookGateway = null;

    private  Connector connector;

    // replace with property calls
    private final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private final String USERNAME = "test";
    private final String PASSWORD = "testtest";
    //language=SQL
    private final String SQL_GET_ALL_BOOKS = "SELECT  * from testdb.book";

    /**
     * Singleton pattern - allows instantiation 
     * of BookGateway
     * @return {@link BookGateway}
     */
    public static BookGateway getBookGateway() {
        if(bookGateway == null) {
            bookGateway = new BookGateway();
        }
        return  bookGateway;
    }

    /**
     * Inserts a {@link Book} CatalogItem to the database
     * This method  checks if it already exist or not.
     * If it does increment the quantity.
     * @param
     */
    public void insert(Book book){

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
            } catch (Exception e) { e.printStackTrace(); }
        }
    }

    /**
     * Helper method that checks if the book already exist
     * in the database.
     * @param title: the title of the book
     * @param author: the author of the book
     * @return boolean - True if the book exist; False if it doesn't
     */
    public boolean checkIfBookExists(String title, String author){
        boolean check = false;
        try{
            String query = "SELECT * FROM testdb.book WHERE title = '" + title + "' AND author = '" + author + "'";
            connector = DbConnection.get(query);
            ResultSet r = connector.getResultSet();
            if (r.next()){
                check = true;
            }
        } catch (Exception e){
            e.printStackTrace();
        } finally { connector.close(); }
        return check;
    }

    /**
     *  Helper method that gets the quantity of the queried book.
     * @param title: the title of the book
     * @param author: the author of the book
     * @return
     */
    public int getQty(String title, String author) {
        int qtyStock = 0;
        try {
            String query = "SELECT * FROM testdb.book WHERE title = '" + title + "' AND author = '" + author + "'";
            connector = DbConnection.get(query);
            ResultSet r = connector.getResultSet();
            if (r.next()){
                qtyStock = r.getInt("qty_in_stock");
            }
        }catch (Exception e){
            e.printStackTrace();
        } finally {
            connector.close();
        }
        return qtyStock;
    }

    /**
     * Updates a {@link Book} CatalogItem in the database
     * @param book
     */
    public void update(Book book) {
        try {
            System.out.println(book.getAuthor());
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
            e.printStackTrace();
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
     * Query all {@link Book} from the database
     * @return list of books
     */
    public List<Book> getAll() {
        List<Book> bookArrayList = new ArrayList<>();
        connector = DbConnection.get(SQL_GET_ALL_BOOKS);
        ResultSet resultSet = connector.getResultSet();
        buildFromResultSet(bookArrayList, resultSet);
        return bookArrayList;
    }

    /**
     * Deletes a Book from the Database
     * @param book
     */
    public void delete(Book book){
        try{
            String query = "DELETE FROM testdb.book WHERE id=" + book.getId();
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
        if(search.getAuthor().equals("author")){
            i++;
        }
        if(search.getPublisher().equals("publisher")){
            i++;
        }
        if(search.getLanguage().equals("language")){
            i++;
        }
        if(search.getFormat().equals("format")){
            i++;
        }
        if(search.getIsbn10().equals("isbn10")){
            i++;
        }
        if(search.getIsbn13().equals("isbn13")){
            i++;
        }

        String filter = "SELECT * from testdb.book WHERE";
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
        if(search.getAuthor().equals("author")){
            i--;
            filter += " author LIKE '%" + search.getSearch() + "%'";
            if(i>0){

                filter += " OR";

            }
        }
        if(search.getPublisher().equals("publisher")){
            i--;
            filter += " publisher LIKE '%" + search.getSearch() + "%'";
            if(i>0){
                filter +=" OR";

            }
        }
        if(search.getLanguage().equals("language")){
            i--;
            filter += " language LIKE '%" + search.getSearch() + "%'";
            if(i>0){
                filter += " OR";
            }
        }
        if(search.getFormat().equals("format")){
            i--;
            filter += " format LIKE '%" + search.getSearch() + "%'";
            if(i>0){
                filter += " OR";
            }
        }
        if(search.getIsbn10().equals("isbn10")){
            i--;
            filter += " isbn10 LIKE '%" + search.getSearch() + "%'";
            if(i>0){
                filter += " OR";
            }
        }
        if(search.getIsbn13().equals("isbn13")){

            filter += " isbn13 LIKE '%" + search.getSearch() + "%'";

        }
        System.out.println("END " + filter);
        return filter;
    }

    /**
     * Search database based on {@link SearchCriteria}
     * Creates a BookArrayList with the help of {@link #buildFromResultSet(List, ResultSet)}
     * @param search: SearchCriteria
     * @return bookArrayList
     */
    public  List<Book> search(SearchCriteria search){
        System.out.print("Entered gateway");
        List<Book> bookArrayList = new ArrayList<>();
        if(search.getTitle().equals("title") ||
        search.getAuthor().equals("author") ||
        search.getPublisher().equals("publisher") ||
        search.getLanguage().equals("language") ||
        search.getFormat().equals("format") ||
        search.getIsbn10().equals("isbn10") ||
        search.getIsbn13().equals("isbn13")){
        String filter = buildFilterString(search);
        connector = DbConnection.get(filter);
        ResultSet resultSet = connector.getResultSet();
        buildFromResultSet(bookArrayList, resultSet);
        }
        return bookArrayList;
    }

    /**
     * Helper method that builds from queried ResultSet into a {@link Book} object
     * Adds it to the bookArrayList
     * @param bookArrayList
     * @param resultSet
     */
    private void buildFromResultSet(List<Book> bookArrayList, ResultSet resultSet) {
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
    }
}
