package com.soen343.server.models;

import com.soen343.server.Catalog;
import com.soen343.server.models.catalog.Book;
import com.soen343.server.models.catalog.Magazine;
import com.soen343.server.models.catalog.Movie;
import com.soen343.server.models.catalog.Music;
import com.soen343.server.models.catalog.movie.Actor;
import com.soen343.server.models.catalog.movie.Dub;
import com.soen343.server.models.catalog.movie.Producer;
import com.soen343.server.models.catalog.movie.Subtitle;
import org.junit.Test;

public class MovieTest {

    @Test
    public void createMovieTest() {

        // Add Movies
        Actor actor = new Actor("TestActor");
        Dub dub = new Dub("EnglishDub");
        Producer producer = new Producer("TestProducer");
        Subtitle sub = new Subtitle("DutchSub");

        Movie movie = new Movie("TestMovie", 8, 0, "TestDirector", "English", "1988/12/24", 120 );

        movie.addActor(actor);
        movie.addDub(dub);
        movie.addProducer(producer);
        movie.addSubtitle(sub);

        System.out.println(movie);
    }

    @Test
    public void movieCatalogLoopTest() {

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

            System.out.println("Movie "+  i + "created");
        }
    }

    @Test
    public void movieCatalogAddTest() {

        Catalog catalog = Catalog.getCatalog();

        // Add Books
        catalog.addCatalogItem(new Book("Book1", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        catalog.addCatalogItem(new Book("Book2", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        catalog.addCatalogItem(new Book("Book3", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        catalog.addCatalogItem(new Book("Book4", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));
        catalog.addCatalogItem(new Book("Book5", 3, 0, "TEST", "Hardcover", 1234, 1993, "TEST", "English", "0123456789", "0123456789123"));

        // Add Magazines
        catalog.addCatalogItem(new Magazine("Magazine1", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        catalog.addCatalogItem(new Magazine("Magazine2", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        catalog.addCatalogItem(new Magazine("Magazine3", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        catalog.addCatalogItem(new Magazine("Magazine4", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));
        catalog.addCatalogItem(new Magazine("Magazine5", 2, 0, "TEST", "FRENCH", "1988/12/21", "0123456789", "0123456789123"));

        // Add Music
        catalog.addCatalogItem(new Music("Music1", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        catalog.addCatalogItem(new Music("Music2", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        catalog.addCatalogItem(new Music("Music3", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        catalog.addCatalogItem(new Music("Music4", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));
        catalog.addCatalogItem(new Music("Music5", 5, 0, "CD", "TEST", "TEST", "1988/12/20", "B01F0XMMKC"));

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

            catalog.addCatalogItem(movie);
        }

        System.out.println("Breakpoint here");
    }
}
