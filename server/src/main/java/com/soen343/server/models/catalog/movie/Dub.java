package com.soen343.server.models.catalog.movie;

import com.soen343.server.models.catalog.Movie;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Dub {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    protected long id;

    @Column
    @NotBlank
    private String dubLanguage;

    @ManyToMany(mappedBy = "dubs")
    private Set<Movie> movies = new HashSet<>();

    public String getDubLanguage() {
        return dubLanguage;
    }

    public Set<Movie> getMovies() {
        return movies;
    }

    @Override
    public String toString() {
        return "Subtitle [id=" + id + ", dubLanguage=" + dubLanguage + "]";
    }
}
