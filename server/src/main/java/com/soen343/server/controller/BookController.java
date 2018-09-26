package com.soen343.server.controller;

import com.soen343.server.models.Book;
import com.soen343.databaseConnection.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.sql.*;
import java.util.*;

@RestController
@CrossOrigin
public class BookController {

    // import com.soen343.server.models.Book to use the dbconnection class
    //for a get request open the connector first!
    @GetMapping("/getBook")
    public ArrayList<Book> getBooks() {
        ArrayList<Book> listOfBook = new ArrayList<Book>();
        try {
            // uses the connector object to pass the value retrieved from DbConnection class
            Connector connector = DbConnection.get("select * from testdb.Book");
            // takes the ResultSet from the connector which are the values from the select
            ResultSet resultSet = connector.getResultSet();
            // do the logic applied to the ResultSet
            while (resultSet.next()) {
                // use the arraylist to add anonymous object retrieved from the db
                listOfBook.add(new Book(resultSet.getString("name")));
            }
            // closes all database resources
            connector.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return listOfBook;
    }

    @PostMapping("/addBook")
    public ArrayList<Book> addBook(@RequestBody Book book) {
        System.out.println("ok");
        try {
            // for a POST method, call the DbConnection object and make the call with .update
            // DbConnection update handles the closing for POST
            DbConnection.update("insert into testdb.Book (name) values ('" + book.name + "')");
            return this.getBooks();
        } catch (Exception e) {
            System.out.println(e);
        }

        // returns the updated booklist to the frontend to be displayed
        return this.getBooks();
    }

    @PostMapping("/deleteBook")
    public ArrayList<Book> deleteBook(@RequestBody Book book) {
        try {
            // SQL Query to delete
            DbConnection.update("DELETE FROM testdb.Book WHERE name = '" + book.name + "'");

        } catch (Exception e) {
            System.out.println(e);
        }

        // returns the updated booklist to the frontend to be displayed
        return this.getBooks();
    }
}
