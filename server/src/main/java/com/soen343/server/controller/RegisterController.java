package com.soen343.server.controller;

import com.soen343.server.models.User;
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

public class RegisterController {

    //Puts all users into an ArrayList
    @GetMapping("/getUser")
    public ArrayList<User> getUsers(){
        ArrayList<User> listOfUsers = new ArrayList<User>();
        try{

        Connector connector = DbConnection.get("select * from testdb.User");
        ResultSet resultSet = connector.getResultSet();

        while(resultSet.next()){
        String first_name = resultSet.getString("first_name");
        String last_name = resultSet.getString("last_name");
        String email_address = resultSet.getString("email_address");
        String physical_address = resultSet.getString("physical_address");
        String phone_number = resultSet.getString("phone_number");
        String username = resultSet.getString("username");
        String password = resultSet.getNString("password");
        Boolean is_admin = resultSet.getBoolean("is_admin");
        Boolean is_online = resultSet.getBoolean("is_online");
        User user = new User(first_name,last_name, email_address, physical_address, phone_number, username, password, is_admin, is_online);
        listOfUsers.add(user);
        }

        }
        catch(Exception e){
            System.out.println(e);
        }
        // takes the ResultSet from the connector which are the values from the select
        return listOfUsers;
    }

    @PostMapping("/addUser")
    public boolean addUser(@RequestBody User user) {

        boolean successful=false; 

        try { 

           if (this.doesEmailExist(user.email))
           {
                System.out.println("Email already exists.");
           }

           else{ 
            
            String query = "insert into testdb.User (first_name, last_name, email_address, physical_address, phone_number, password) values ('" + user.getFirstName() + "', '"
            + user.getLastName() + "', '" 
            + user.email + "', '" 
            + user.getAddress() + "', '"
            + user.phone +"', '"
            + user.getPassword() + "') ";

            DbConnection.update(query); 
             successful = true;
           }
        } catch (Exception e) {
            System.out.println(e);
        } 
        return successful;
    }

    public boolean doesEmailExist(String user_email)
    {

        boolean exist = false;

        try{

        Connector connector = DbConnection.get("SELECT * FROM testdb.User WHERE email_address = '" + user_email + "'");
        ResultSet resultSet = connector.getResultSet();
    
        if (resultSet.next() == true) {
            exist = true;
        }
            
        connector.close();

        } catch (Exception e) {
            System.out.println(e);
        }

        System.out.println(exist);

        return exist;


    }

}