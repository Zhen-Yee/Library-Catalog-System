package com.soen343.server.models;

import java.util.Objects;

/**
 * User class. This class is used to store the information of a client/admin.
 */
public class User {

    /**
     * Private attributes
     */
    private String firstName;
    private String lastName;
    private String emailAddress;
    private String physicalAddress;
    private String phoneNumber;
    private String userName;
    private String password;
    private boolean isAdmin;
    private boolean isOnline;

    /**
     * Constructor
     */
    public User(String firstName, String lastName, String emailAddress, String physicalAddress, String phoneNumber, String userName, String password, boolean isAdmin, boolean isOnline) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.physicalAddress = physicalAddress;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isOnline = isOnline;
    }

    /**
     * Getter Methods
     */
    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getPhysicalAddress() {
        return physicalAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public boolean isOnline() {
        return isOnline;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + getFirstName() + '\'' +
                ", lastName='" + getLastName() + '\'' +
                ", emailAddress='" + getEmailAddress() + '\'' +
                ", physicalAddress='" + getPhysicalAddress() + '\'' +
                ", phoneNumber='" + getPhoneNumber() + '\'' +
                ", userName='" + getUserName() + '\'' +
                ", password='" + getPassword() + '\'' +
                ", isAdmin=" + isAdmin() +
                ", isOnline=" + isOnline() +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return isAdmin() == user.isAdmin() &&
                isOnline() == user.isOnline() &&
                Objects.equals(getFirstName(), user.getFirstName()) &&
                Objects.equals(getLastName(), user.getLastName()) &&
                Objects.equals(getEmailAddress(), user.getEmailAddress()) &&
                Objects.equals(getPhysicalAddress(), user.getPhysicalAddress()) &&
                Objects.equals(getPhoneNumber(), user.getPhoneNumber()) &&
                Objects.equals(getUserName(), user.getUserName()) &&
                Objects.equals(getPassword(), user.getPassword());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getFirstName(), getLastName(), getEmailAddress(), getPhysicalAddress(), getPhoneNumber(), getUserName(), getPassword(), isAdmin(), isOnline());
    }
}
