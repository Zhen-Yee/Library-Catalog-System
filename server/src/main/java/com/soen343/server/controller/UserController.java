package com.soen343.server.controller;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.Credentials;
import com.soen343.server.models.User;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.util.ArrayList;

@RestController
@CrossOrigin
public class UserController {

    @PostMapping("/validateUser")
    public ArrayList<String> validateUser(@RequestBody Credentials credentials){

        ArrayList<String> detailsList = new ArrayList<>();

        System.out.println("-------------VALIDATE REQUEST RECEIVED---------------");
        System.out.println(credentials.getEmail());
        System.out.println(credentials.getPassword());
        System.out.println("-----------------------------------------------------");

        try {

            Connector connector = DbConnection.get(
                    "SELECT * FROM testdb.User WHERE email_address = '" + credentials.getEmail() + "' AND password = '" + credentials.getPassword() + "'");
            ResultSet resultSet = connector.getResultSet();

            if (resultSet.next()) {
                System.out.println("FOUND IN ROW: " + resultSet.getRow());

                detailsList.add(resultSet.getString("first_name"));
                detailsList.add(resultSet.getString("email_address"));
                detailsList.add(resultSet.getString("is_admin"));

                setActive(credentials.getEmail(), true);
            }

            connector.close();

        } catch (Exception e) {
            System.out.println(e);
        }

        return detailsList;
    }

    @PostMapping("LogoutUser")
    public Boolean logoutUser(@RequestBody User user) {
        setActive(user.getEmailAddress(), false);
        return true;
    }

    private Boolean setActive (String email, Boolean userActive) {
        // update in future to have second parameter be the unique generated ID - see JPA

        int status = userActive ? 1 : 0;
        try {
            String query = "UPDATE testdb.User SET is_online='" + status + "' WHERE email_address = '" + email + "'";
            DbConnection.update(query);
            return true;
        } catch (Exception e) {
            System.out.println(e);
        }
        return false;
    }

    private User buildUser(ResultSet resultSet) throws Exception {
        String first_name = resultSet.getString("first_name");
        String last_name = resultSet.getString("last_name");
        String email_address = resultSet.getString("email_address");
        String physical_address = resultSet.getString("physical_address");
        String phone_number = resultSet.getString("phone_number");
        String username = resultSet.getString("username");
        String password = "THIS IS TOTALLY SECURE!";
        boolean is_admin = resultSet.getBoolean("is_admin");
        boolean is_online = resultSet.getBoolean("is_online");
        return new User(first_name,last_name, email_address, physical_address, phone_number, username, password, is_admin, is_online);
    }

}
