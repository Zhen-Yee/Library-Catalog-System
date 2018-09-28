package com.soen343.server.controller;
import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.Credentials;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.util.ArrayList;

@RestController
@CrossOrigin
public class UserController {

    @PostMapping("/validateUser")
    public ArrayList<String> validateUser(@RequestBody Credentials credentials){

        ArrayList<String> detailsList = new ArrayList<>();

        try {
            Connector connector = DbConnection.get("SELECT * FROM testdb.User WHERE email_address = '" +
                    credentials.getEmail() + "' AND password = '" + credentials.getPassword() + "'");
            ResultSet resultSet = connector.getResultSet();

            if (resultSet.next()) {
                detailsList.add(resultSet.getString("first_name"));
                detailsList.add(resultSet.getString("email_address"));
                detailsList.add(resultSet.getString("is_admin"));
                setActive(credentials.getEmail(), true);
                connector.close();
                return detailsList;
            }

            connector.close();

        } catch (Exception e) {
            System.out.println("Error Occurs in /validateUser : \n" + e);
        }
        return null;
    }

    @PostMapping("/logoutUser")
    public void logoutUser(@RequestBody String email) {
        System.out.println("logging out user with email: " + email);
        setActive(email, false);
    }

    private void setActive (String email, Boolean userActive) {
        int status = userActive ? 1 : 0;
        try {
            String query = "UPDATE testdb.User SET is_online='" + status + "' WHERE email_address = '" + email + "'";
            DbConnection.update(query);
        } catch (Exception e) {
            System.out.println("Error Occurs in setActive() : \n" + e);
        }
    }
}
