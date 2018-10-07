package com.soen343.server.models.catalog;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class Music extends CatalogItem {

    @NotBlank
    private String type;

    @NotBlank
    private String artist;

    @NotBlank
    private String label;

    @Pattern(regexp = "^([0-9]{4})\\/(0[1-9]|1[0-2])\\/(0[1-9]|[1-2][0-9]|3[0-1])$",
            message = "Date must have the following format 'YYYY/MM/DD")
    private String releaseDate;

    @Pattern(regexp ="/^B[\\dA-Z]{9}|\\d{9}(X|\\d)$/", message= "Non valid ASIN format - (tip)copy one from amazon")
    private String asin;

    public Music(String title, int qtyInStock, int qtyOnLoan, String type, String artist, String label,
                 String releaseDate, String asin) {
        super(title, qtyInStock, qtyOnLoan);
        this.type = type;
        this.artist = artist;
        this.label = label;
        this.releaseDate = releaseDate;
        this.asin = asin;
    }

    // Accessors
    public String getType() {
        return type;
    }

    public String getArtist() {
        return artist;
    }

    public String getLabel() {
        return label;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public String getAsin() {
        return asin;
    }

    // Mutators
    public void setType(String type) {
        this.type = type;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setAsin(String asin) {
        this.asin = asin;
    }

    @Override
    public String toString() {
        return "Music [id=" + id + ", type="+ type + ", title=" + title + "]";
    }
}
