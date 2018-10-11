package com.soen343.server.models.catalog.movie;

import com.soen343.server.models.catalog.Movie;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class Producer {

    protected long id;

    @NotBlank
    private String producer;

    private Set<Movie> movies = new HashSet<>();

    public String getProducer() {
        return producer;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    @Override
    public String toString() {
        return "Subtitle [id=" + id + ", producer=" + producer + "]";
    }
}
