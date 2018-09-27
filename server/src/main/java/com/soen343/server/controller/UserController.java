package com.soen343.server.controller;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.Credentials;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;

@RestController
@CrossOrigin
public class UserController {

    @GetMapping("/validateUser")
    public Boolean validateUser(@RequestBody Credentials credentials){

        boolean validated = false;

        try{

            Connector connector = DbConnection.get(
                    "SELECT * FROM testdb.User WHERE email_address = '" + credentials.getEmail() + "' AND password = '"
                            + credentials.getPassword() + "'" );
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
