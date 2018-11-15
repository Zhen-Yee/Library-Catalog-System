package com.soen343.server.models;

public class SearchCriteria{
    // itemType: CatalogItemType,
    // title: string,
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
    private String book;
    private String magazine;
    private String movie;
    private String music;
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
    
    public SearchCriteria(
        String book,
        String magazine,
        String movie,
        String music, 
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
            this.book = book;
            this.magazine = magazine;
            this.movie = movie;
            this.music = music;
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

    public String getBook(){
        return this.book;
    }

    public String getMagazine(){
        return this.magazine;
    }

    public String getMovie(){
        return this.movie;
    }

    public String getMusic(){
        return this.music;
    }

    public String getTitle(){
        return this.title;
    }

    public String getAuthor(){
        return this.author;
    }

    public String getFormat(){
        return this.format;
    }
 
    public String getPublisher(){
        return this.publisher;
    }
    
    public String getLanguage(){
        return this.language;
    }

    public String getIsbn10(){
        return this.isbn10;
    }

    public String getIsbn13(){
        return this.isbn13;
    }

    public String getType(){
        return this.type;
    }

    public String getArtist(){
        return this.artist;
    }

    public String getLabel(){
        return this.label;
    }

    public String getAsin(){
        return this.asin;
    }

    public String getDirector(){
        return this.director;
    }

    public String getProducers(){
        return this.producers;
    }

    public String getActors(){
        return this.actors;
    }
    
    public String getSubtitles(){
        return this.subtitles;
    }
    
    public String getDubs(){
        return this.dubs;
    }

    public String getReleaseDate(){
        return this.releaseDate;
    }

}





