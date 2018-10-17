package com.soen343.server;

import com.soen343.server.gateways.MovieGateway;
import com.soen343.server.models.catalog.*;
import java.util.ArrayList;

public class Catalog {

    private static Catalog catalog = null;

    private ArrayList<CatalogItem> catalogItems;

    private Catalog() {
        catalogItems = new ArrayList<>();
    }

    public static Catalog getCatalog() {
        if (catalog == null) {
            catalog = new Catalog();
        }

        return catalog;
    }

    public void addCatalogItem(CatalogItem catalogItem) {
        // this.catalogItems.add(catalogItem);
        if (catalogItem.getClass() == Book.class) {
            // Add book to db
        }
        if (catalogItem.getClass() == Magazine.class) {
            // Add magazine to db
        }
        if (catalogItem.getClass() == Music.class) {
            //MusicGateway.insert((Music)catalogItem);
            // Add movie to db
        }
        if (catalogItem.getClass() == Movie.class) {
            MovieGateway.insert((Movie)catalogItem);
        }
    }

    public ArrayList<CatalogItem> getAllCatalogItems() {
        return catalogItems;
    }

    public ArrayList<Book> getAllBooks() {
        ArrayList<Book> books = new ArrayList<>();

        for (CatalogItem catalogItem : catalogItems) {
            if (catalogItem.getClass() == Book.class) {
                books.add((Book)catalogItem);
            }
        }

        return books;
    }

    public ArrayList<Magazine> getAllMagazines() {
        ArrayList<Magazine> magazines = new ArrayList<>();

        for (CatalogItem catalogItem : catalogItems) {
            if (catalogItem.getClass() == Magazine.class) {
                magazines.add((Magazine)catalogItem);
            }
        }

        return magazines;
    }

    public ArrayList<Music> getAllMusic() {
        ArrayList<Music> music = new ArrayList<>();

        for (CatalogItem catalogItem : catalogItems) {
            if (catalogItem.getClass() == Music.class) {
                music.add((Music)catalogItem);
            }
        }

        return music;
    }

    public ArrayList<Movie> getAllMovies() {
        ArrayList<Movie> movies = new ArrayList<>();

        for (CatalogItem catalogItem : catalogItems) {
            if (catalogItem.getClass() == Movie.class) {
                movies.add((Movie)catalogItem);
            }
        }

        return movies;
    }

    public void deleteMovie(long id) {
        MovieGateway.delete(id);
    }

    /**
     * used for debugging until data persists to db
     */
    public void loadFakeData() {

        // Add Books
        addCatalogItem(new Book("Book1", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        addCatalogItem(new Book("Book2", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        addCatalogItem(new Book("Book3", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        addCatalogItem(new Book("Book4", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        addCatalogItem(new Book("Book5", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));

        // Add Magazines
        addCatalogItem(new Magazine("Magazine1", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        addCatalogItem(new Magazine("Magazine2", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        addCatalogItem(new Magazine("Magazine3", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        addCatalogItem(new Magazine("Magazine4", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        addCatalogItem(new Magazine("Magazine5", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));

        // Add Music
        addCatalogItem(new Music("Music1", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        addCatalogItem(new Music("Music2", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        addCatalogItem(new Music("Music3", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        addCatalogItem(new Music("Music4", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        addCatalogItem(new Music("Music5", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));

        // Add Movies
        // fill array list with a string to test actor
        ArrayList<String> x = new ArrayList<String>();
        for (int i = 1; i < 6; i++) {
            Movie movie = new Movie("Movie" + i, 8, 0, "DIRECTOR", "English", "1988/12/24", 120, x);
            addCatalogItem(movie);
        }
        
        /*
        note that by using the add methods you not only add the actor/dub/sub/producer to the movie, but you also add
        the movie to those respective items. That is to say, if you do a actor.getMovies() it'll return all the movies
        associated with that actor.
         */
    }
}
