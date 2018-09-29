package com.soen343.server.models.catalog;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "book")
public class Book extends CatalogItem {

    @Column
    @NotBlank
    private String author;

    @Column
    @Pattern(regexp = "^Paperback$|^Hardcover$", message = "Format must be either 'Paperback' or 'Hardcover'")
    private String format;

    @Column
    @Min(0)
    private int pages;

    @Column
    @NotBlank
    private String publisher;

    @Column
    @Min(value=0, message="only the books after jesus was born matters")
    @Max(value=9999, message="year of publication can't be greater than 9999")
    private int yearOfPublication;

    @Column
    @NotBlank
    private String language;

    @Column
    @Pattern(regexp = "^[0-9]{10}$", message = "ISBN-10 must have exactly 10 digits")
    private String isbn10;

    @Column
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

    @Override
    public String toString() {
        return "Book [id=" + id + ", title=" + title + "]";
    }
}
