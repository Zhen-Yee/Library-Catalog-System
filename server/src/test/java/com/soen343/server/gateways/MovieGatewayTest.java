package com.soen343.server.gateways;

import com.soen343.server.models.catalog.Movie;
import org.junit.Test;

public class MovieGatewayTest {

    @Test
    public void insertTest() {
        Movie movie = new Movie("TestTitle", 3, 0, "TestDirector", "TestLanguage", "1998/12/08", 120);

        MovieGateway.insert(movie);
    }
}
