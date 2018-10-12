package com.soen343.server.models;

import com.soen343.server.models.catalog.Movie;
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
}
