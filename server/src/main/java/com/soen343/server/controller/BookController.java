package com.soen343.server.controller;

import com.soen343.server.models.Book;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.sql.*;
import java.util.*;

@RestController
@CrossOrigin
public class BookController {
	
	@GetMapping("/getBook")
    public ArrayList<Book> getBooks(){
        ArrayList<Book> listOfBook = new ArrayList<Book>();
        try {
            // Database Connection
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb", "test", "testtest");
            Statement stmt = con.createStatement();
            
            // SQL Query to search
            ResultSet rs = stmt.executeQuery("select * from testdb.Book");
            while (rs.next()){
                // use the arraylist to add anonymous object retrieved from the db
                listOfBook.add(new Book(rs.getString("name")));
                System.out.println(rs.getString("name"));
            }
            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return listOfBook;
    }

    @PostMapping("/addBook")
    public Book addBook(@RequestBody Book book){
        try{
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb", "test", "testtest");
        Statement stmt = con.createStatement();
        
        // SQL Query to insert
        stmt.executeUpdate("insert into testdb.Book (name) values ('"+book.name+"')");
        con.close();
        return book;
        }
        catch(Exception e){
            System.out.println(e);
        }
        return book;
    }

    @PostMapping("/deleteBook")
    public Book deleteBook(@RequestBody Book book){
        try{
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb", "test", "testtest");
            Statement stmt = con.createStatement();

            // SQL Query to delete
            stmt.executeUpdate("DELETE FROM testdb.Book WHERE name = '"+ book.name + "'");
            con.close();
        }
        catch( Exception e){
            System.out.println(e);
        }
        return book;
    }
}
