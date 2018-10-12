package com.soen343.server;

import com.soen343.server.models.catalog.*;
import com.soen343.server.models.catalog.movie.Actor;
import com.soen343.server.models.catalog.movie.Dub;
import com.soen343.server.models.catalog.movie.Producer;
import com.soen343.server.models.catalog.movie.Subtitle;
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
        this.catalogItems.add(catalogItem);
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
        Actor actor = new Actor("TestActor");
        Dub dub = new Dub("English");
        Producer producer = new Producer("Producer");
        Subtitle sub = new Subtitle("Dutch");

        for (int i = 1; i < 6; i++) {
            Movie movie = new Movie("Movie" + i, 8, 0, "DIRECTOR", "English", "1988/12/24", 120 );
            movie.addActor(actor);
            movie.addDub(dub);
            movie.addProducer(producer);
            movie.addSubtitle(sub);

            addCatalogItem(movie);
        }
        
        /*
        note that by using the add methods you not only add the actor/dub/sub/producer to the movie, but you also add
        the movie to those respective items. That is to say, if you do a actor.getMovies() it'll return all the movies
        associated with that actor.
         */
    }
}
