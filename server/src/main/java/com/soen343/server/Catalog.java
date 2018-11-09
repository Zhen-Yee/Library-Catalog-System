package com.soen343.server;

import com.soen343.server.gateways.BookGateway;
import com.soen343.server.gateways.MagazineGateway;
import com.soen343.server.gateways.MovieGateway;
import com.soen343.server.gateways.MusicGateway;
import com.soen343.server.models.catalog.*;
import com.soen343.server.models.SearchCriteria;

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
     * Default constructor that initializes the identity map
     */
    private Catalog() {
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
            BookGateway.insert((Book)catalogItem);
        }
        if (catalogItem.getClass() == Magazine.class) {
            MagazineGateway.insert((Magazine)catalogItem);
            // Add magazine to db
        }
        if (catalogItem.getClass() == Music.class) {
            MusicGateway.insert((Music)catalogItem);
            // Add movie to db
        }
        if (catalogItem.getClass() == Movie.class) {
            MovieGateway.insert((Movie)catalogItem);
            // Add movie to db
        }
        isDatabaseChange = true;
    }

    public void updateCatalogItem(CatalogItem catalogItem) {
        if (catalogItem.getClass() == Book.class) {
            BookGateway.update((Book)catalogItem);
        }
        if (catalogItem.getClass() == Magazine.class) {
            MagazineGateway.update((Magazine)catalogItem);
        }
        if (catalogItem.getClass() == Music.class) {
            MusicGateway.update((Music)catalogItem);
        }
        if (catalogItem.getClass() == Movie.class) {
            MovieGateway.update((Movie)catalogItem);
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
        return BookGateway.getAll();
    }

    public List<Magazine> getAllMagazines() { return MagazineGateway.getAll(); }

    public List<Music> getAllMusics() {
        return MusicGateway.getAll();
    }

    public List<Movie> getAllMovies() {
        return MovieGateway.getAll();
    }

    public void deleteCatalogItem(CatalogItem catalogItem){
        if(catalogItem.getClass() == Book.class){
            BookGateway.delete((Book)catalogItem);
        }
        else if(catalogItem.getClass() == Music.class){
            MusicGateway.delete((Music)catalogItem);
        }
        else if(catalogItem.getClass() == Magazine.class){
            MagazineGateway.delete((Magazine)catalogItem);
        }
        else if(catalogItem.getClass() == Movie.class){
            MovieGateway.delete((Movie)catalogItem);
        }
        isDatabaseChange = true;
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

    public Long getMapKeyFromValue(CatalogItem value) {
        for (Map.Entry<Long, CatalogItem> entry : identityMap.entrySet()){
            if(value.equals(entry.getValue())){
                return entry.getKey();
            }
        }
        return null;
    }

    public void addToIdentityMap(long uid, CatalogItem catalogItem) {
        if (identityMap.containsValue(catalogItem)){
            CatalogItem currentItem = identityMap.get(getMapKeyFromValue(catalogItem));
            currentItem.setQtyInStock(currentItem.getQtyInStock()+1);
            identityMap.replace(getMapKeyFromValue(catalogItem), currentItem);
        } else {
            identityMap.put(uid, catalogItem);
        }
    }

    public void deleteFromIdentityMap(CatalogItem catalogItem) {
        if (identityMap.containsValue(catalogItem)){
            identityMap.remove(getMapKeyFromValue(catalogItem));
        } else {
            try {
                throw new NullPointerException();
            } catch (NullPointerException e){
                System.out.println("Cannot find value from from map... Cannot delete.");
                e.printStackTrace();
            }
        }
    }

    public void updateIdentityMap(long uid, CatalogItem catalogItem){
        if (identityMap.containsValue(catalogItem)){
            identityMap.replace(catalogItem.getId(), catalogItem);
        }
    }

    public  Map<Long, CatalogItem> search(SearchCriteria searchCriteria){
        System.out.print("entered Catalog");
        List<CatalogItem> searchedCatalogItems = new ArrayList<>();
        //if(searchCriteria.getItemType().equals("book")){
        searchedCatalogItems.addAll(BookGateway.search(searchCriteria));
        searchedCatalogItems.addAll(MovieGateway.search(searchCriteria));
       // }
       // if(searchCriteria.getItemType().equals("magazine")){
      //  searchedCatalogItems.addAll(MagazineGateway.search(searchCriteria));
       //     }
      //  if(searchCriteria.getItemType().equals("music")){
         //   searchedCatalogItems.addAll(MusicGateway.search(searchCriteria));
         //   }
 
                return searchedCatalogItems.stream().collect(Collectors.toMap(CatalogItem::getId, Function.identity()));
    }

    /**
     * used for debugging until data persists to db
     */
    public void loadFakeData() {

        // // Add Books
        // addCatalogItem(new Book("Book1", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        // addCatalogItem(new Book("Book2", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        // addCatalogItem(new Book("Book3", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        // addCatalogItem(new Book("Book4", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        // addCatalogItem(new Book("Book5", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));

        // // Add Magazines
        // addCatalogItem(new Magazine("Magazine1", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        // addCatalogItem(new Magazine("Magazine2", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        // addCatalogItem(new Magazine("Magazine3", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        // addCatalogItem(new Magazine("Magazine4", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        // addCatalogItem(new Magazine("Magazine5", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));

        // // Add Music
        // addCatalogItem(new Music("Music1", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        // addCatalogItem(new Music("Music2", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        // addCatalogItem(new Music("Music3", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        // addCatalogItem(new Music("Music4", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        // addCatalogItem(new Music("Music5", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));

        // // Add Movies
        // // fill array list with a string to test actor
        // ArrayList<String> x = new ArrayList<String>();
        // for (int i = 1; i < 6; i++) {
        //     Movie movie = new Movie("Movie" + i, 8, 0, "DIRECTOR", "English", "1988/12/24", 120, x);
        //     addCatalogItem(movie);
        // }
        
        /*
        note that by using the add methods you not only add the actor/dub/sub/producer to the movie, but you also add
        the movie to those respective items. That is to say, if you do a actor.getMovies() it'll return all the movies
        associated with that actor.
         */
    }
}
