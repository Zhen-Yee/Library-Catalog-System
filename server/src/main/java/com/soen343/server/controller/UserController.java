package com.soen343.server.controller;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.Credentials;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;

@RestController
@CrossOrigin
public class UserController {

    @PostMapping("/validateUser")
    public Boolean validateUser(@RequestBody Credentials credentials){

        boolean validated = false;
        System.out.println("-------------VALIDATE REQUEST RECEIVED---------------");
        System.out.println(credentials.getEmail());
        System.out.println(credentials.getPassword());
        System.out.println("-----------------------------------------------------");

        try{

            Connector connector = DbConnection.get(
                    "SELECT * FROM testdb.User WHERE email_address = '" + credentials.getEmail() + "' AND password = '" + credentials.getPassword() + "'");
            ResultSet resultSet = connector.getResultSet();

            if (resultSet.next()) {
                validated = true;
                //update the is_online to 1 if online and 0 if not
                System.out.println("Updating the is_online value on the database");
                DbConnection.update("UPDATE testdb.User SET is_online = 1 WHERE email_address = '" + credentials.getEmail() + "' AND password = '" + credentials.getPassword() + "'");
                System.out.println("USER FOUND!!");
            }

            connector.close();

        } catch (Exception e) {
            System.out.println(e);
        }

        return validated;
    }

}
