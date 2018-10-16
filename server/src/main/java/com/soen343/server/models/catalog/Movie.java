package com.soen343.server.models.catalog;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.HashSet;
import java.util.*;

public class Movie extends CatalogItem{

   @NotBlank
    private String director;

    private ArrayList<String> producers;

    private ArrayList<String> actors;

    @NotBlank
    private String language;

    private ArrayList<String> subtitles;

    private ArrayList<String> dubs;

   @Pattern(regexp = "^([0-9]{4})\\/(0[1-9]|1[0-2])\\/(0[1-9]|[1-2][0-9]|3[0-1])$",
            message = "Date must have the following format 'YYYY/MM/DD")
    private String releaseDate;

   @Min(0)
    private int runTime;

    // default constructor used to handle mapping for the ArrayList from
    // frontend to backend
    private Movie(){
        super();
    }

    /**
     * use this constructor when building movie from database.
     */
    public Movie(String title, int qtyInStock, int qtyOnLoan, String director, ArrayList<String> producers, ArrayList<String> actors,
                 String language, ArrayList<String> subtitles, ArrayList<String> dubs, String releaseDate, int runTime) {
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

    // Constructor used in the test getAll()
    public Movie(String title, int qtyInStock, int qtyOnLoan, String director, String language, String releaseDate, int runTime, ArrayList<String>actors) {
        super(title, qtyInStock, qtyOnLoan);
        this.director = director;
        this.language = language;
        this.releaseDate = releaseDate;
        this.runTime = runTime;
        this.actors = actors;
    }

    // Accessors
    public String getDirector() {
        return director;
    }

    public ArrayList<String> getProducers() {
        return producers;
    }

    public ArrayList<String> getActors() {
        return actors;
    }

    public String getLanguage() {
        return language;
    }

    public ArrayList<String> getSubtitles() {
        return subtitles;
    }

    public ArrayList<String> getDubs() {
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

    @Override
    public String toString() {
        return "Movie [id=" + id + ", title=" + title + "]";
    }
}
