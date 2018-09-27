package com.soen343.server.models;

public class User {
    private String firstName;
    private String lastName;
    public String email;
    private String address;
    public String phone;
    private String username;
    private String password;
    private boolean is_admin;
    private boolean is_online;

public User(String first_name, String last_name, String email_address, 
   String address, String phone_number, String username, String password, boolean is_admin, boolean is_online){
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email_address;
        this.address = address;
        this.phone = phone_number;
        this.username = username;
        this.password = password;
        this.is_admin = is_admin;
        this.is_online = is_online;

        System.out.println(this.email);
    }
    
    public String getFirstName(){
        return this.firstName;
    }
    public String getLastName(){
        return this.lastName;
    }

    public String getEmailAddress(){
        return this.email;
    }
    public String getAddress(){
        return this.address;
    }
    public String getPhoneNumber(){
        return this.phone;
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

}
 