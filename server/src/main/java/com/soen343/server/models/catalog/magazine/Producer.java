package com.soen343.server.models.catalog.magazine;

import com.soen343.server.models.catalog.Movie;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Producer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    protected long id;

    @Column
    @NotBlank
    private String producer;

    @ManyToMany(mappedBy = "producers")
    private Set<Movie> movies = new HashSet<>();

    public String getProducer() {
        return producer;
    }

    public Set<Movie> getMovies() {
        return movies;
    }
}
