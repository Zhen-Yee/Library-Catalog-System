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

            System.out.println("FOUND IN COLUMN ROW: " + resultSet.getRow());

            if (resultSet.next()) {
                setActive(credentials.getEmail());
                validated = true;
                System.out.println("USER FOUND!!");
            }

            connector.close();

        } catch (Exception e) {
            System.out.println(e);
        }

        return validated;
    }

    private Boolean setActive (String email) {
        // update in future to have second parameter be the unique generated ID - see JPA
        try {
            String query = "UPDATE testdb.User SET is_online='0' WHERE email_address = '" + email + "'";
            DbConnection.update(query);
            return true;
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

}
