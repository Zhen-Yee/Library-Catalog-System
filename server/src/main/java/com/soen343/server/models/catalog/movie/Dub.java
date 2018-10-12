package com.soen343.server.models.catalog.movie;

import com.soen343.server.models.catalog.Movie;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class Dub {

    protected long id;

    @NotBlank
    private String dubLanguage;

    private Set<Movie> movies = new HashSet<>();

    public String getDubLanguage() {
        return dubLanguage;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    /**
     * Use this constructor when it's a new dub
     */
    public Dub(String dubLanguage) {
        this.dubLanguage = dubLanguage;
    }

    /**
     * Use this constructor when the dub already exists in db
     */
    public Dub(String dubLanguage, Set<Movie> movies) {
        this.dubLanguage = dubLanguage;
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "Subtitle [id=" + id + ", dubLanguage=" + dubLanguage + "]";
    }
}
