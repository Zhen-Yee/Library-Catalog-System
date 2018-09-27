package com.soen343.server.controller;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;

@RestController
@CrossOrigin
public class UserController {

    @GetMapping("/validateUser")
    public Boolean validateUser(String email, String password){

        boolean validated = false;

        try{

            Connector connector = DbConnection.get(
                    "SELECT * FROM testdb.User WHERE email_address = '" + email + "' AND password = '" + password + "'" );
            ResultSet resultSet = connector.getResultSet();

            if (resultSet.next()) {
                validated = true;
            }

            connector.close();

        } catch (Exception e) {
            System.out.println(e);
        }

        return validated;
    }

}
