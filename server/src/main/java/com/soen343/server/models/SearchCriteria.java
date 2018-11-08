package com.soen343.server.models;

public class SearchCriteria{
    // itemType: CatalogItemType,
    //     title: string,
    // search = string;
    // author: string;
    // format: string;
    // publisher: string;
    // language: string;
    // isbn10: string;
    // isbn13: string;
    // type: string;
    // artist: string;
    // label: string;
    // asin: string;
    // director: string;
    // producers: string;
    // actors: string;
    // subtitles: string;
    // dubs: string;
    // releaseDate: string;
    private String iType;
    private String title;
    private String search;
    private String author;
    private String format;
    private String publisher;
    private String language;
    private String isbn10;
    private String isbn13;
    private String type;
    private String artist;
    private String label;
    private String asin;
    private String director;
    private String producers;
    private String actors;
    private String subtitles;
    private String dubs;
    private String releaseDate;
    
    public SearchCriteria(String iType, 
        String title, 
        String search,
        String author,
        String format,
        String publisher,
        String language,
        String isbn10,
        String isbn13,
        String type,
        String artist,
        String label,
        String asin,
        String director,
        String producers,
        String actors,
        String subtitles,
        String dubs,
        String releaseDate){
            this.iType = iType;
            this.title = title;
            this.search = search;
            this.author = author;
            this.format = format;
            this.publisher = publisher;
            this.language = language;
            this.isbn10 = isbn10;
            this.isbn13 = isbn13;
            this.type = type;
            this.artist = artist;
            this.label = label;
            this.asin = asin;
            this.director = director;
            this.producers = producers;
            this.actors = actors;
            this.subtitles = subtitles;
            this. dubs = dubs;
            this.releaseDate = releaseDate;
    }
    public String getSearch(){
        return this.search;
    }
    public String getItemType(){
        return this.iType;
    }
}