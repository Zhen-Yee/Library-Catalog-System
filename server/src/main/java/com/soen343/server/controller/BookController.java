package com.soen343.server.controller;

import com.soen343.server.models.Book;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.sql.*;

@RestController
@CrossOrigin
public class BookController {
	
	@GetMapping("/getBook")
    public void getBooks(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb", "test", "testtest");
            // here sonoo is database name, root is username and password
            Statement stmt = con.createStatement();
            //int ex = stmt.executeUpdate("insert into new_table (name) values (5)");
            ResultSet rs = stmt.executeQuery("select * from testdb.Book");
            while (rs.next())
                System.out.println(rs.getString("name"));
            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @PostMapping("/addBook")
    public Book addBook(@RequestBody Book book){
        try{
        // book.name = "ok";
        Class.forName("com.mysql.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mysql://testdbinstance.cwtjkaidrsfz.us-east-2.rds.amazonaws.com:3306/testdb", "test", "testtest");
        // here sonoo is database name, root is username and password
        Statement stmt = con.createStatement();
        //int ex = stmt.executeUpdate("insert into new_table (name) values (5)");
        int rs = stmt.executeUpdate("insert into testdb.Book (name) values ('"+book.name+"')");
        System.out.print(book.name);
        return book;
        }
        catch(Exception e){
            System.out.println(e);
        }
        return book;
    }

    @DeleteMapping("/deleteBook")
    public Book deleteBook(@RequestBody Book book){
        System.out.print(book.name);
        return book;
    }
}