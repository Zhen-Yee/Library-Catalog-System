package com.soen343.databaseConnection;
import java.sql.*;

// Class created to handle the database resources in other class through this object
// handles ResultSet (response from the server), Connection to the database and the statement(query)
public class Connector {
    private ResultSet resultSet;
    private Connection connection;
    private Statement statement;

    public Connector(ResultSet resultSet, Connection connection, Statement statement){
        this.resultSet = resultSet;
        this.connection = connection;
        this.statement = statement;
    }

    // Getters & Setters
    public Connection getConnection(){
        return this.connection;
    }
    public ResultSet getResultSet(){
        return this.resultSet;
    }

    public void setConnection(Connection connection){
        this.connection = connection;
    }
    public void setResultSet(ResultSet resultSet){
        this.resultSet = resultSet;
    }

}
