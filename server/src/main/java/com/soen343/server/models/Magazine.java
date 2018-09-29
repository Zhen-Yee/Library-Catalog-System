package com.soen343.server.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "magazine")
public class Magazine extends CatalogItem {

    @Column
    @NotBlank
    private String publisher;

    @Column
    @NotBlank
    private String language;

    @Column
    @Pattern(regexp = "^([0-9]{4})\\/(0[1-9]|1[0-2])\\/(0[1-9]|[1-2][0-9]|3[0-1])$",
            message = "Date must have the following format 'YYYY/MM/DD")
    private String dateOfPublication;

    @Column
    @Pattern(regexp = "^[0-9]{10}$", message = "ISBN-10 must have exactly 10 digits")
    private String isbn10;

    @Column
    @Pattern(regexp = "^[0-9]{13}$", message = "ISBN-13 must have exactly 13 digits")
    private String isbn13;

    public Magazine(String title, int qtyInStock, int qtyOnLoan, String publisher, String  language,
                    String dateOfPublication, String isbn10, String isbn13) {
        super(title, qtyInStock, qtyOnLoan);
    }

    public String getPublisher() {
        return publisher;
    }

    public String getLanguage() {
        return language;
    }

    public String getDateOfPublication() {
        return dateOfPublication;
    }

    public String getIsbn10() {
        return isbn10;
    }

    public String getIsbn13() {
        return isbn13;
    }

    @Override
    public String toString() {
        return "Magazine: [id=" + id + ", title=" + title + "]";
    }
}
