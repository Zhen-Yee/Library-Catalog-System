package com.soen343.server.models.catalog.movie;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.soen343.server.models.catalog.Movie;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class Dub {

    protected long id;

    @NotBlank
    private String dubLanguage;

    @JsonBackReference
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

    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof Dub))
            return false;
        if (obj == this)
            return true;
        return this.getDubLanguage().equalsIgnoreCase(((Dub) obj).getDubLanguage());
    }
}
