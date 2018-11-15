package com.soen343.server.catalog;

import com.soen343.server.Catalog;
import com.soen343.server.gateways.MovieGateway;
import com.soen343.server.models.catalog.Movie;
import org.junit.Test;

import java.util.ArrayList;

public class AddCatalogItemTest {

    @Test
    public void addMovieTest() {
        ArrayList<String> actors = new ArrayList<>();
        ArrayList<String> producers = new ArrayList<>();
        ArrayList<String> subs = new ArrayList<>();
        ArrayList<String> dubs = new ArrayList<>();
        actors.add("Actor1");
        actors.add("Actor2");
        producers.add("Producer1");
        producers.add("Producer2");
        subs.add("French");
        subs.add("Spanish");
        dubs.add("Japanese");
        dubs.add("Dutch");
        Movie movie = new Movie("TestTitle", 3, 0, "TestDirector", producers, actors, "TestLanguage", subs, dubs, "1998/12/12", 120);
        MovieGateway movieGateway = new MovieGateway();
        Catalog.getCatalog().addCatalogItem(movie);
        System.out.println("Movie successfully added and given ID: "+ movie.getId());
        movieGateway.delete(movie);
    }
}
