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
        System.out.println(user.toString());
        ArrayList<User> listOfUsers;
        ArrayList<String> listOfEmails = new ArrayList<String>();
        boolean successful=false; /*
        try { 
            // for a POST method, call the DbConnection object and make the call with .update
            // DbConnection update handles the closing for POST
           listOfUsers = getUsers();
         for(int i=0; i<listOfUsers.size();i++){
            listOfEmails.add(listOfUsers.get(i).getEmailAddress());
         }
         //checks whether or not email address is already taken
           if(listOfEmails.contains(user.getEmailAddress())){
            System.out.println("Email already taken");
            successful = false;
           }
           else{ */
            System.out.println("okkkkk" + user.first_name);
            DbConnection.update("insert into testdb.User (first_name, last_name, email_address, physical_address, phone_number) ('" + user.getFirstName() + " "
             + user.getLastName() + " " 
             + user.getEmailAddress() + " " 
             + user.getAddress() + " "
             + user.getPhoneNumber() +" )");
             System.out.println("Successful register"); /*
             successful = true;
           }
        } catch (Exception e) {
            System.out.println(e);
        } */
        return successful;
    }

}