package com.soen343.server.models.catalog.movie;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.soen343.server.models.catalog.Movie;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class Producer {

    protected long id;

    @NotBlank
    private String producer;

    @JsonBackReference
    private Set<Movie> movies = new HashSet<>();

    public String getProducer() {
        return producer;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    /**
     * Use this constructor when it's a new producer
     */
    public Producer(String producer) {
        this.producer = producer;
    }

    /**
     * Use this constructor when the producer already exists in db
     */
    public Producer(String producer, Set<Movie> movies) {
        this.producer = producer;
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "Subtitle [id=" + id + ", producer=" + producer + "]";
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof Producer))
            return false;
        if (obj == this)
            return true;
        return this.getProducer().equalsIgnoreCase(((Producer) obj).getProducer());
    }
}
