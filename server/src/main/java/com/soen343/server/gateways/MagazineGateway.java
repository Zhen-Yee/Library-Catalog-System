package com.soen343.server.gateways;

import com.soen343.databaseConnection.Connector;

import java.sql.*;
import java.util.ArrayList;
import com.soen343.databaseConnection.Connector;
import com.soen343.databaseConnection.DbConnection;
import com.soen343.server.models.catalog.Magazine;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;


public class MagazineGateway {
    public static void delete(Magazine magazine){
        try{        
            if(magazine.getQtyInStock() == 0){
                String query = "DELETE FROM testdb.magazine WHERE id=" + magazine.getId();
               DbConnection.update(query);
            }
            else{
                String query = "UPDATE testdb.magazine SET qty_in_stock = '" + magazine.getQtyInStock()+ "' WHERE id = " + magazine.getId() ;
                DbConnection.update(query); 
            }
        }
        catch(Exception e){

        }
    }
}
