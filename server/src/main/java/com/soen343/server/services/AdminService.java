package com.soen343.server.services;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;

import javax.servlet.http.HttpSession;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Service class of the Admin class
 */
public class AdminService {

    private Connector connector;

    //language=MySQL
    private final String SQL_ACTIVE_USERS = "SELECT * from User WHERE isOnline = TRUE";



    /**
     * Method that will query from db and return
     * a list of active users
     * @return List<User>
     */
    public List<String> getActiveUsers(){
        List<String> userList;

        connector = DbConnection.get(SQL_ACTIVE_USERS);
        ResultSet resultSet = connector.getResultSet();

        try{
            while(resultSet.next()){
                userList.add(new User(
                        resultSet.getString("first_name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("email_address"),
                        resultSet.getString("physical_address"),
                        resultSet.getInt("phone_number"),
                        resultSet.getString("username"),
                        resultSet.getString("password"),
                        resultSet.getBoolean("isOnline")
                ));
            }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
        }
        finally {
            connector.close();
            return userList;
        }

    }

}
