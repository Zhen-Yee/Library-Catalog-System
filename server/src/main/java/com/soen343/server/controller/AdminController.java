package com.soen343.server.controller;

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
public class AdminController {

    // import com.soen343.server.models.Book to use the dbconnection class
    
    @PostMapping("/promoteAdmin")
    public void promoteAdmin(@RequestBody String admin) {

        try {
            
            DbConnection.update("UPDATE testdb.User SET is_admin=1 WHERE username='"+admin+"'");
            System.out.println("The user has been promoted to admin.");
            
        } catch (Exception e) {
            System.out.println(e);
        }

    }

}
