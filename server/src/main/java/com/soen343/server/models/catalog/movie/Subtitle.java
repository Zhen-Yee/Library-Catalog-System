package com.soen343.server.models.catalog.movie;

import com.soen343.server.models.catalog.Movie;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class Subtitle {

    protected long id;

    @NotBlank
    private String subLanguage;

    private Set<Movie> movies = new HashSet<>();

    public String getSubLanguage() {
        return subLanguage;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    /**
     * Use this constructor when it's a new subtitle
     */
    public Subtitle(String subLanguage) {
        this.subLanguage = subLanguage;
    }

    /**
     * Use this constructor when the subtitle already exists in db
     */
    public Subtitle(String subLanguage, Set<Movie> movies) {
        this.subLanguage = subLanguage;
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "Subtitle [id=" + id + ", subLanguage=" + subLanguage + "]";
    }

    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof Subtitle))
            return false;
        if (obj == this)
            return true;
        return this.getSubLanguage().equalsIgnoreCase(((Subtitle) obj).getSubLanguage());
    }
}
