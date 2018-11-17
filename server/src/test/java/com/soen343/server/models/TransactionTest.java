package com.soen343.server.models;

import com.soen343.server.models.catalog.Book;
import com.soen343.server.models.catalog.Movie;
import com.soen343.server.models.catalog.Music;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TransactionTest {
    private static final Logger LOGGER = Logger.getLogger(TransactionTest.class.getName());
    private Book book;
    private Music music;
    private Movie movie;

    @Before
    public void buildCatalogItems() {
        // Build Book
        this.book = new Book("TestBook", 3, 0, "TestAuthor", "Paperback", 999, 1988, "TestPublisher", "TestLanguage",
                "1234567890", "1234567890123");

        // Build Music
        this.music = new Music("TestMusic", 3, 0, "CD", "TestArtist", "TestLabel", "1988/04/13", "B0000A0A4D");

        // Build Movie
        ArrayList<String> actors = new ArrayList<>();
        ArrayList<String> producers = new ArrayList<>();
        ArrayList<String> subs = new ArrayList<>();
        ArrayList<String> dubs = new ArrayList<>();
        actors.add("Actor1");
        actors.add("Actor2");
        producers.add("Producer1");
        producers.add("Producer2");
        subs.add("French");
        subs.add("Spanish");
        dubs.add("Japanese");
        dubs.add("Dutch");
        this.movie = new Movie("TestMovie", 3, 0, "TestDirector", producers, actors, "TestLanguage", subs, dubs,
                "1998/12/12", 120);
    }

    @Test
    public void t001_generateDueDates() {
        Transaction transaction = new Transaction();
        int bookLoanLength = 7;
        int mediaLoanLength = 2;
        Calendar calendar = Calendar.getInstance();
        Date baseDate = new Date(System.currentTimeMillis());
        calendar.setTime(baseDate);
        calendar.add(Calendar.DAY_OF_YEAR, bookLoanLength);
        Date expectedBookDueDate = calendar.getTime();
        calendar.setTime(baseDate);
        calendar.add(Calendar.DAY_OF_YEAR, mediaLoanLength);
        Date expectedMediaDueDate = calendar.getTime();

        LOGGER.log(Level.INFO, "Testing book due date...");
        Date actualBookDueDate = transaction.generateDueDate(this.book, baseDate);
        assertEquals("correctly generates book due date", expectedBookDueDate, actualBookDueDate);

        LOGGER.log(Level.INFO, "Testing music due date...");
        Date actualMusicDueDate = transaction.generateDueDate(this.music, baseDate);
        assertEquals("correctly generates musicDueDate", expectedMediaDueDate, actualMusicDueDate);

        LOGGER.log(Level.INFO, "Testing movie due date...");
        Date actualMovieDueDate = transaction.generateDueDate(this.movie, baseDate);
        assertEquals("Correctly generates movie due date", expectedMediaDueDate, actualMovieDueDate);
    }
}
