package com.soen343.server.gateways;

import com.soen343.server.models.Transaction;
import com.soen343.server.models.catalog.Movie;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import java.util.ArrayList;

@Ignore
public class TransactionGatewayTest {
    private static Movie movie;

    @BeforeClass
    public static void buildMovie() {
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
        movie.setId(9999);
    }

    @Test
    public void insertTransactionTest() {
        Transaction testTransaction = new Transaction("TestEmail@test.com", movie);
        TransactionGateway.getGateway().insert(testTransaction);
        System.out.println("Insert Test Breakpoint line");
    }
}
