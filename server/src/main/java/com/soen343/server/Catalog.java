package com.soen343.server;

import com.soen343.server.gateways.*;
import com.soen343.server.models.SearchCriteria;
import com.soen343.server.models.Transaction;
import com.soen343.server.models.catalog.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Catalog {

    private static Catalog catalog = null;

    private Map<Long,CatalogItem> identityMap;
    private boolean isDatabaseChange;

    /**
     * Gateways objects
     */
    private BookGateway bookGateway;
    private MagazineGateway magazineGateway;
    private MusicGateway musicGateway;
    private MovieGateway movieGateway;
    private TransactionGateway transactionGateway;

    /**
     * Default constructor that initializes the identity map
     */
    private Catalog() {
        bookGateway = BookGateway.getBookGateway();
        magazineGateway = MagazineGateway.getMagazineGateway();
        musicGateway = MusicGateway.getMusicGateway();
        movieGateway = MovieGateway.getMovieGateway();
        transactionGateway = TransactionGateway.getGateway();
        identityMap = new HashMap<>();
        isDatabaseChange = false;
        populateIdentityMap();
    }

    public static Catalog getCatalog() {
        if (catalog == null) {
            catalog = new Catalog();
        }

        return catalog;
    }

    public void addCatalogItem(CatalogItem catalogItem) {
        if (catalogItem.getClass() == Book.class) {
            // Add book to db
            bookGateway.insert((Book)catalogItem);
        }
        if (catalogItem.getClass() == Magazine.class) {
            magazineGateway.insert((Magazine)catalogItem);
            // Add magazine to db
        }
        if (catalogItem.getClass() == Music.class) {
            musicGateway.insert((Music)catalogItem);
            // Add movie to db
        }
        if (catalogItem.getClass() == Movie.class) {
            movieGateway.insert((Movie)catalogItem);
            // Add movie to db
        }
        isDatabaseChange = true;
    }

    public void updateCatalogItem(CatalogItem catalogItem) {
        if (catalogItem.getClass() == Book.class) {
            bookGateway.update((Book)catalogItem);
        }
        if (catalogItem.getClass() == Magazine.class) {
            magazineGateway.update((Magazine)catalogItem);
        }
        if (catalogItem.getClass() == Music.class) {
            musicGateway.update((Music)catalogItem);
        }
        if (catalogItem.getClass() == Movie.class) {
            movieGateway.update((Movie)catalogItem);
        }
        isDatabaseChange = true;
    }

    /**
     * This method is to query from database and return a certain
     * type of CatalogItem - in order to have 1 access point
     * through the controller.
     * @param CatalogItemType
     * @returnn List<CatalogItem>
     */
    public List<CatalogItem> getAllCatalogItemsByType(String CatalogItemType) {
        List<CatalogItem> catalogItems = new ArrayList<>();
        switch (CatalogItemType){
            case "Book" : catalogItems.addAll(getAllBooks()); break;
            case "Music" : catalogItems.addAll(getAllMusics()); break;
            case "Magazine" : catalogItems.addAll(getAllMagazines()); break;
            case "Movie" : catalogItems.addAll(getAllMovies()); break;
            case "All" :
                catalogItems.addAll(getAllBooks());
                catalogItems.addAll(getAllMusics());
                catalogItems.addAll(getAllMagazines());
                catalogItems.addAll(getAllMovies());
                break;
            default: System.out.println("Invalid CatalogItemType: " + CatalogItemType);
        }
        return catalogItems;
    }

    public List<Book> getAllBooks() {
        return bookGateway.getAll();
    }

    public List<Magazine> getAllMagazines() { return magazineGateway.getAll(); }

    public List<Music> getAllMusics() {
        return musicGateway.getAll();
    }

    public List<Movie> getAllMovies() {
        return movieGateway.getAll();
    }

    public void deleteCatalogItem(CatalogItem catalogItem){
        if(catalogItem.getClass() == Book.class){
            bookGateway.delete((Book)catalogItem);
        }
        else if(catalogItem.getClass() == Music.class){
            musicGateway.delete((Music)catalogItem);
        }
        else if(catalogItem.getClass() == Magazine.class){
            magazineGateway.delete((Magazine)catalogItem);
        }
        else if(catalogItem.getClass() == Movie.class){
            movieGateway.delete((Movie)catalogItem);
        }
        isDatabaseChange = true;
    }

    public void returnCatalogItem(CatalogItem catalogItem){
        if(catalogItem.getClass() == Book.class){
            catalogItem.returnItem();
        }
        else if(catalogItem.getClass() == Music.class){
            catalogItem.returnItem();
        }
        else if(catalogItem.getClass() == Movie.class){
            catalogItem.returnItem();
        }
        isDatabaseChange = true;
    }

    /**
     * Synchronized method that checks every item and compare it to the
     * in memory data. If found it decrements the qty in stock and increment
     * the qty on loan. This updates the database and uses {{@link #insertTransaction(String, CatalogItem)}}
     * to create a new Transaction object. If not found, the identity map gets repopulated
     * and the item is recheck again. A ResponseEntity is returned.
     * @param email
     * @param cart
     * @return
     */
    public synchronized Boolean checkout(String email, List<CatalogItem> cart) {
        for (CatalogItem item : cart) {
            if (identityMap.containsValue(item)){
                item.checkoutItem();
                updateCatalogItem(item);
                insertTransaction(email, item);
            } else { //repopulate the identity map and check again
                populateIdentityMap();

                if (identityMap.containsValue(item)){
                    item.checkoutItem();
                    updateCatalogItem(item);
                    insertTransaction(email, item);
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Converts the JSONArray into a CatalogItem list
     * @param cart: JSONArray
     * @return List of CatalogItem
     */
    public List<CatalogItem> cartMapToList(JSONArray cart) {
        List<CatalogItem> cartList = new ArrayList<>();
        JSONObject item;
        for(int i = 0 ; i < cart.length() ; i++) {
            item = cart.getJSONObject(i);
            int quantity = item.getInt("quantity");
            int j = 0;
            while (j < quantity) {
                cartList.add(buildFromJObject((JSONObject) item.get("catalogItem")));
                j++;
            }
        }
        return cartList;
    }

    /**
     * Helper method that returns the object from the identity map
     * @param object: JSONObject
     * @return CatalogItem object
     */
    public CatalogItem buildFromJObject(JSONObject object) {
        long id = object.getInt("id");
        return identityMap.get(id);
    }

    /**
     * TRANSACTION METHODS
     */

    /**
     * Creates a new {@link Transaction} object and inserts it to the
     * database.
     * @param email: String email of the user
     * @param catalogItem: Item
     */
    public void insertTransaction(String email, CatalogItem catalogItem) {
        transactionGateway.insert(new Transaction(email, catalogItem));
    }

    /**
     *  Identity Map Utilities
     *  Concerning the identity map
     */

    /**
     *  This method populates the CatalogItem identity map
     */
    public void populateIdentityMap() {
        List<CatalogItem> catalogItemList = getAllCatalogItemsByType("All");
        identityMap =  catalogItemList.stream().collect(Collectors.toMap(CatalogItem::getId, Function.identity()));
    }

    /**
     * Retrieve the current IdentityMap
     * If a change was made to the database, it will refresh
     * the identity map and set back the boolean to false
     * @return Map<Long, CatalogItem>
     */
    public Map<Long, CatalogItem> getIdentityMap() {
        if(isDatabaseChange) {
            populateIdentityMap();
            isDatabaseChange = false;
        }
        return identityMap;
    }

    public  Map<Long, CatalogItem> search(SearchCriteria searchCriteria){
        System.out.print("entered Catalog");
        List<CatalogItem> searchedCatalogItems = new ArrayList<>();
        if(searchCriteria.getBook().equals("book")){
            searchedCatalogItems.addAll(bookGateway.search(searchCriteria));
        }
        if(searchCriteria.getMovie().equals("movie")){
            searchedCatalogItems.addAll(movieGateway.search(searchCriteria));
        }
        if(searchCriteria.getMagazine().equals("magazine")){
            searchedCatalogItems.addAll(magazineGateway.search(searchCriteria));
        }
        if(searchCriteria.getMusic().equals("music")){
            searchedCatalogItems.addAll(musicGateway.search(searchCriteria));
        }

        if(searchCriteria.getBook().equals("") &&
                searchCriteria.getMagazine().equals("") &&
                searchCriteria.getMovie().equals("") &&
                searchCriteria.getMusic().equals("")
        ){
            searchedCatalogItems.addAll(bookGateway.search(searchCriteria));
            searchedCatalogItems.addAll(movieGateway.search(searchCriteria));
            searchedCatalogItems.addAll(magazineGateway.search(searchCriteria));
            searchedCatalogItems.addAll(musicGateway.search(searchCriteria));
        }

        return searchedCatalogItems.stream().collect(Collectors.toMap(CatalogItem::getId, Function.identity()));
    }
}
