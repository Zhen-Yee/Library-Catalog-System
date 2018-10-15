package com.soen343.server.models.catalog;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class Magazine extends CatalogItem {

    @NotBlank
    private String publisher;

    @NotBlank
    private String language;

    @Pattern(regexp = "^([0-9]{4})\\/(0[1-9]|1[0-2])\\/(0[1-9]|[1-2][0-9]|3[0-1])$",
            message = "Date must have the following format 'YYYY/MM/DD")
    private String dateOfPublication;

    @Pattern(regexp = "^[0-9]{10}$", message = "ISBN-10 must have exactly 10 digits")
    private String isbn10;

    @Pattern(regexp = "^[0-9]{13}$", message = "ISBN-13 must have exactly 13 digits")
    private String isbn13;

    public Magazine(String title, int qtyInStock, int qtyOnLoan, String publisher, String  language,
                    String dateOfPublication, String isbn10, String isbn13) {
        super(title, qtyInStock, qtyOnLoan);
        this.publisher = publisher;
        this.language = language;
        this.dateOfPublication = dateOfPublication;
        this.isbn10 = isbn10;
        this.isbn13 = isbn13;
    }

    // Accessors
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

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    // Mutators
    public void setLanguage(String language) {
        this.language = language;
    }

    public void setDateOfPublication(String dateOfPublication) {
        this.dateOfPublication = dateOfPublication;
    }

    public void setIsbn10(String isbn10) {
        this.isbn10 = isbn10;
    }

    public void setIsbn13(String isbn13) {
        this.isbn13 = isbn13;
    }

    @Override
    public String toString() {
        return "Magazine [id=" + id + ", title=" + title + "]";
    }
}
