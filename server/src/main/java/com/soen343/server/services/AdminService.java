package com.soen343.server.services;

import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.User;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class that contains all the
 * logic for the Admin
 */
@Service
public class AdminService {

    private Connector connector;

    //language=MySQL
    private final String SQL_ACTIVE_USERS = "SELECT * from testdb.User WHERE is_online=true";
    //language=MySQL
    private final String SQL_INACTIVE_USERS = "SELECT * from testdb.User WHERE is_online=false";
    //language=MySQL
    private final String SQL_ALL_NON_ADMIN = "SELECT * from testdb.User WHERE is_admin=false";


    /**
     * Method that will query from db and return
     * a list of users
     * @return List<User>
     */
    public List<User> getUsers(String SQL){
        List<User> userList = new ArrayList<>();

        connector = DbConnection.get(SQL);
        ResultSet resultSet = connector.getResultSet();

        try{
            while(resultSet.next()){
                userList.add(new User(
                        resultSet.getString("first_name"),
                        resultSet.getString("last_name"),
                        resultSet.getString("email_address"),
                        resultSet.getString("physical_address"),
                        resultSet.getString("phone_number"),
                        resultSet.getString("username"),
                        resultSet.getString("password"),
                        resultSet.getBoolean("is_admin"),
                        resultSet.getBoolean("is_online"),
                        resultSet.getTimestamp("last_logged")
                ));
            }
        } catch (SQLException e) {
            System.out.println("Unable to query from result set.");
            e.printStackTrace();
        }
        finally {
            connector.close();
        }
        return userList;
    }

    /**
     * Method that will query from db and return
     * a list of active users
     * @return List<User>
     */
    public List<User> getActiveUsers() {
        return getUsers(SQL_ACTIVE_USERS);
    }

    /**
     * Method that will query from db and return
     * a list of inactive users
     * @return List<User>
     */
    public List<User> getInactiveUsers() {
        return getUsers(SQL_INACTIVE_USERS);
    }

    /**
     * Method that will query from db and return
     * a list of non admin users
     * @return List<User>
     */
    public List<User> getNonAdminUsers() {
        return getUsers(SQL_ALL_NON_ADMIN);
    }


}
