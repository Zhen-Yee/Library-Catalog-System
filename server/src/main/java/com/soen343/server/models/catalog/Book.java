package com.soen343.server.models.catalog;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class Book extends CatalogItem {

    @NotBlank
    private String author;

    @Pattern(regexp = "^Paperback$|^Hardcover$", message = "Format must be either 'Paperback' or 'Hardcover'")
    private String format;

    @Min(0)
    private int pages;

    @NotBlank
    private String publisher;

    @Min(value=0, message="only the books after jesus was born matters")
    @Max(value=9999, message="year of publication can't be greater than 9999")
    private int yearOfPublication;

    @NotBlank
    private String language;

    @Pattern(regexp = "^[0-9]{10}$", message = "ISBN-10 must have exactly 10 digits")
    private String isbn10;

    @Pattern(regexp = "^[0-9]{13}$", message = "ISBN-13 must have exactly 13 digits")
    private String isbn13;

    public Book(String title, int qtyInStock, int qtyOnLoan, String author, String format, int pages,
                int yearOfPublication, String publisher, String language, String isbn10, String isbn13) {
        super(title, qtyInStock, qtyOnLoan);
        this.author = author;
        this.format = format;
        this.pages = pages;
        this.publisher = publisher;
        this.yearOfPublication = yearOfPublication;
        this.language = language;
        this.isbn10 = isbn10;
        this.isbn13 = isbn13;
    }

    // Accessors
    public String getAuthor() { return author; }

    public String getFormat() { return format; }

    public int getPages() {
        return pages;
    }

    public String getPublisher() {
        return publisher;
    }

    public int getYearOfPublication() {
        return yearOfPublication;
    }

    public String getLanguage() {
        return language;
    }

    public String getIsbn10() {
        return isbn10;
    }

    public String getIsbn13() {
        return isbn13;
    }

    // Mutators

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setYearOfPublication(int yearOfPublication) {
        this.yearOfPublication = yearOfPublication;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setIsbn10(String isbn10) {
        this.isbn10 = isbn10;
    }

    public void setIsbn13(String isbn13) {
        this.isbn13 = isbn13;
    }

    @Override
    public String toString() {
        return "Book [id=" + id + ", title=" + title + "]";
    }
}
