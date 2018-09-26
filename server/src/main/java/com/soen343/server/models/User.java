package com.soen343.server.models;

public class User {
    public String first_name;
    private String last_name;
    private String email_address;
    private String address;
    private String phone_number;
    private String username;
    private String password;
    private boolean is_admin;
    private boolean is_online;

    User(){
        this.first_name = "";
        this.last_name = "";
        this.email_address = "";
        this.address = "";
        this.phone_number = "";
        this.username = "";
        this.password = "";
    }

   public User(String first_name, String last_name, String email_address, 
   String address, String phone_number, String username, String password, boolean is_admin, boolean is_online){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email_address = email_address;
        this.address = address;
        this.phone_number = phone_number;
        this.username = username;
        this.password = password;
        this.is_admin = is_admin;
        this.is_online = is_online;
    }
    
    public String getFirstName(){
        return this.first_name;
    }
    public String getLastName(){
        return this.last_name;
    }

    public String getEmailAddress(){
        return this.email_address;
    }
    public String getAddress(){
        return this.address;
    }
    public String getPhoneNumber(){
        return this.phone_number;
    }
    public String getUsername(){
        return this.username;
    }
    public String getPassword(){
        return this.password;
    }
    public boolean getIsAdmin(){
        return this.is_admin;
    }
    public boolean getIsOnline(){
        return this.is_online;
    }

    public String toString()
    {
        return ""+ this.getFirstName() + " " + this.getLastName();
    }
}
 