package com.soen343.server.models.catalog.movie;

import com.soen343.server.models.catalog.Movie;

import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class Actor {

    protected long id;

    @NotBlank
    private String actor;

    private Set<Movie> movies = new HashSet<>();

    public String getActor() {
        return actor;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    /**
     * Use this constructor when it's a new actor
     */
    public Actor(String actor) {
        this.actor = actor;
    }

    /**
     * Use this constructor when the actor already exists in db
     */
    public Actor(String actor, Set<Movie> movies) {
        this.actor = actor;
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "Subtitle [id=" + id + ", actor=" + actor + "]";
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) return false;
        if (!(obj instanceof Actor))
            return false;
        if (obj == this)
            return true;
        return this.getActor().equalsIgnoreCase(((Actor) obj).getActor());
    }
}
