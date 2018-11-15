package com.soen343.server.gateways;
import java.sql.*;

import com.soen343.server.models.SearchCriteria;
import com.soen343.server.models.catalog.Magazine;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MagazineGateway {

    private static MagazineGateway magazineGateway = null;

    private Connector connector;

    // replace with property calls
    private final String URL = "jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb?useSSL=false";
    private final String USERNAME = "test";
    private final String PASSWORD = "testtest";

    //language=SQL
    private final String SQL_GET_ALL_MAGAZINES = "SELECT * from testdb.magazine";

    /**
     * Singleton pattern - allows instantiation
     * of MagazineGateway
     * @return {@link MagazineGateway}
     */
    public static MagazineGateway getMagazineGateway() {
        if(magazineGateway == null) {
            magazineGateway = new MagazineGateway();
        }
        return magazineGateway;
    }

    /**
     * Updates a {@link Magazine} CatalogItem in the database
     * @param magazine
     */
    public void update(Magazine magazine) {
        try {
            Connection conn = connect();
            Statement stmt = conn.createStatement();
            // SQL QUERY STATEMENT
            String query = "UPDATE testdb.magazine SET qty_in_stock = '" + magazine.getQtyInStock() + "', qty_on_loan = '" + magazine.getQtyOnLoan() + "', title = '" + magazine.getTitle() +
                    "',  isbn10 = '" + magazine.getIsbn10() + "', isbn13 = '" + magazine.getIsbn13() +
                    "', language = '" + magazine.getLanguage() + "', publisher = '" + magazine.getPublisher() +
                    "', date_of_publication = '" + magazine.getDateOfPublication() + "' WHERE id = " + magazine.getId() ;

            stmt.executeUpdate(query);

            conn.close();

        } catch (Exception e) {
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
     * Query all {@link Magazine} from the database
     * @return
     */
    public List<Magazine> getAll() {
        List<Magazine> magazineArrayList = new ArrayList<>();
        connector = DbConnection.get(SQL_GET_ALL_MAGAZINES);
        ResultSet resultSet = connector.getResultSet();
        buildFromResultSet(magazineArrayList, resultSet);
        return magazineArrayList;
    }

    /**
     * Inserts a {@link Magazine} CatalogItem to the database
     * This method  checks if it already exist or not.
     * If it does increment the quantity.
     * @param magazine: Magazine CatalogItem
     */
    public void insert(Magazine magazine){
        if(checkIfMagazineExists(magazine.getTitle())){
            int QtyStock=(getQty(magazine.getTitle()) + 1);
            String query="UPDATE testdb.magazine SET qty_in_stock = " + QtyStock + " WHERE title = '" + magazine.getTitle() + "'";
            System.out.println(query);
            //System.out.println(magazine.getQtyInStock() + 1);
            try{
                DbConnection.update(query);
            }catch(Exception e){
                e.printStackTrace();
            }
        }else{
            magazine.setQtyInStock(1);
            String columnName = "qty_in_stock, qty_on_loan, title, publisher, language, isbn10, isbn13, date_of_publication";
            String values= magazine.getQtyInStock()+ ", "+ magazine.getQtyOnLoan()+ ", '" + magazine.getTitle()+"', '"+ magazine.getPublisher() + "', '" + magazine.getLanguage() + "', '" + magazine.getIsbn10() + "', '" +magazine.getIsbn13()+ "', '" + magazine.getDateOfPublication()+"'";

            String query = "INSERT INTO testdb.magazine (" + columnName + ") VALUES (" + values + ")";

            try{
                DbConnection.update(query);

            }catch(Exception e){
                e.printStackTrace();
            }
        }
    }

    /**
     * Helper method that checks if the magazine already exist
     * in the database.
     * @param title: the title of the magazine
     * @return boolean - True if the magazine exist; False if it doesn't,
     */
    public boolean checkIfMagazineExists(String title){
        boolean check=false;
        try{
            String query="SELECT * FROM testdb.magazine WHERE title = '" + title +"'";
            connector=DbConnection.get(query);
            ResultSet r=connector.getResultSet();
            if(r.next()){
                check=true;
            }
            connector.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        return check;
    }

    /**
     *  Helper method that gets the quantity of the queried magazine.
     * @param title: the title of the magazine
     * @return
     */
    public int getQty(String title){
        int qtyStock=0;
        try{
            String query="SELECT * FROM testdb.magazine WHERE title = '" + title +"'";
            connector = DbConnection.get(query);
            ResultSet r = connector.getResultSet();
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
     * Deletes a Magazine from the Database
     * @param magazine
     */
    public void delete(Magazine magazine){
        try{
            String query = "DELETE FROM testdb.magazine WHERE id=" + magazine.getId();
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
        if(search.getPublisher().equals("publisher")){
            i++;
        }
        if(search.getLanguage().equals("language")){
            i++;
        }
        if(search.getIsbn10().equals("isbn10")){
            i++;
        }

        if(search.getIsbn13().equals("isbn13")){
            i++;
        }

        String filter = "SELECT * from testdb.magazine WHERE";
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
        if(search.getPublisher().equals("publisher")){
            i--;
            filter += " publisher LIKE '%" + search.getSearch() + "%'";
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
     * Creates a MagazineArrayList with the help of {@link #buildFromResultSet(List, ResultSet)}
     * @param search: SearchCriteria
     * @return MagazineArrayList
     */
    public List<Magazine> search(SearchCriteria search){
        System.out.print("Entered gateway");
        List<Magazine> magazineArrayList = new ArrayList<>();
        String filter = buildFilterString(search);
        connector = DbConnection.get(filter);
        ResultSet resultSet = connector.getResultSet();
        buildFromResultSet(magazineArrayList, resultSet);
        return magazineArrayList;
    }

    /**
     * Helper method that builds from queried ResultSet into a {@link Magazine} object
     * Adds it to the MagazineArrayList
     * @param magazineArrayList
     * @param resultSet
     */
    private void buildFromResultSet(List<Magazine> magazineArrayList, ResultSet resultSet) {
        try {
            while (resultSet.next()) {

                // Creates object for each row in database magazine table
                Magazine magazine = new Magazine(
                        resultSet.getString("title"),
                        resultSet.getInt("qty_in_stock"),
                        resultSet.getInt("qty_on_loan"),
                        resultSet.getString("publisher"),
                        resultSet.getString("language"),
                        resultSet.getString("date_of_publication"),
                        resultSet.getString("isbn10"),
                        resultSet.getString("isbn13")
                );

                magazine.setId(resultSet.getInt("id"));

                magazineArrayList.add(magazine);
            }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        } finally {
            connector.close();
        }
    }

}






