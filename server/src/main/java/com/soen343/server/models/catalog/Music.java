package com.soen343.server.models.catalog;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
public class Music extends CatalogItem {

    @Column
    @NotBlank
    private String type;

    @Column
    @NotBlank
    private String artist;

    @Column
    @NotBlank
    private String label;

    @Column
    @Pattern(regexp = "^([0-9]{4})\\/(0[1-9]|1[0-2])\\/(0[1-9]|[1-2][0-9]|3[0-1])$",
            message = "Date must have the following format 'YYYY/MM/DD")
    private String releaseDate;

    @Column
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

    @Override
    public String toString() {
        return "Music [id=" + id + ", type="+ type + ", title=" + title + "]";
    }
}
