package com.soen343.server.gateways;

import com.soen343.server.models.catalog.Movie;
import org.junit.Test;

import java.util.ArrayList;

public class MovieGatewayTest {

    Movie movie;

    @Test
    public void t001_insertTest() {
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

        movie = new Movie("TestTitle", 3, 0, "TestDirector", producers, actors, "TestLanguage", subs, dubs, "1998/12/12", 120);

        MovieGateway.insert(movie);
        System.out.println("Insert Test Breakpoint line");
    }

    @Test
    public void t002_deleteTest() {
        // select an id to delete
        MovieGateway.delete(14);
    }
}
