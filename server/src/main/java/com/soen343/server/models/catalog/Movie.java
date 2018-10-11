package com.soen343.server.models.catalog;

import com.soen343.server.models.catalog.movie.Actor;
import com.soen343.server.models.catalog.movie.Dub;
import com.soen343.server.models.catalog.movie.Producer;
import com.soen343.server.models.catalog.movie.Subtitle;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.HashSet;
import java.util.Set;

public class Movie extends CatalogItem{

    @NotBlank
    private String director;

    private Set<Producer> producers = new HashSet<>();

    private Set<Actor> actors = new HashSet<>();

    @NotBlank
    private String language;

    private Set<Subtitle> subtitles = new HashSet<>();

    private Set<Dub> dubs = new HashSet<>();

    @Pattern(regexp = "^([0-9]{4})\\/(0[1-9]|1[0-2])\\/(0[1-9]|[1-2][0-9]|3[0-1])$",
            message = "Date must have the following format 'YYYY/MM/DD")
    private String releaseDate;

    @Min(0)
    private int runTime;

    public Movie(String title, int qtyInStock, int qtyOnLoan, String director, Set<Producer> producers, Set<Actor> actors,
                 String language, Set<Subtitle> subtitles, Set<Dub> dubs, String releaseDate, int runTime) {
        super(title, qtyInStock, qtyOnLoan);
        this.director = director;
        this.producers = producers;
        this.actors = actors;
        this.language = language;
        this.subtitles = subtitles;
        this.dubs = dubs;
        this.releaseDate = releaseDate;
        this.runTime = runTime;
    }

    // Accessors
    public String getDirector() {
        return director;
    }

    public Set<Producer> getProducers() {
        return producers;
    }

    public Set<Actor> getActors() {
        return actors;
    }

    public String getLanguage() {
        return language;
    }

    public Set<Subtitle> getSubtitles() {
        return subtitles;
    }

    public Set<Dub> getDubs() {
        return dubs;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public int getRunTime() {
        return runTime;
    }

    // Mutators - ao not add mutators to Many to Many associated attributes! use the Add/Remove methods!
    public void setDirector(String director) {
        this.director = director;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setRunTime(int runTime) {
        this.runTime = runTime;
    }

    public void addProducer(Producer producer) {
        this.producers.add(producer);
        producer.getMovies().add(this);
    }

    public void removeProducer(Producer producer) {
        this.producers.remove(producer);
        producer.getMovies().remove(this);
    }

    public void addActor(Actor actor) {
        this.actors.add(actor);
        actor.getMovies().add(this);
    }

    public void removeActor(Actor actor) {
        this.actors.remove(actor);
        actor.getMovies().remove(this);
    }

    public void addSubtitle(Subtitle subtitle) {
        this.subtitles.add(subtitle);
        subtitle.getMovies().remove(this);
    }

    public void removeSubtitle(Subtitle subtitle) {
        this.subtitles.remove(subtitle);
        subtitle.getMovies().remove(this);
    }

    public void addDub(Dub dub) {
        this.dubs.add(dub);
        dub.getMovies().add(this);
    }

    public void removeDub(Dub dub) {
        this.dubs.remove(dub);
        dub.getMovies().remove(this);
    }

    @Override
    public String toString() {
        return "Movie [id=" + id + ", title=" + title + "]";
    }
}
