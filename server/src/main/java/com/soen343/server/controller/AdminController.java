package com.soen343.server.controller;

import com.soen343.databaseConnection.*;
import com.soen343.server.models.User;
import com.soen343.server.services.AdminService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;


@RestController @CrossOrigin @RequestMapping("/admin")
public class AdminController {

    private AdminService adminService;

    /**
     * Called immediately after AdminController is injected
     */
    @PostConstruct
    public void init() {
        adminService = new AdminService();
    }

    /**
     * Returns a list of active users
     * @return
     */
    @GetMapping("/active-users")
    public List<User> displayActiveUsers() {
        return adminService.getActiveUsers();
    }

    /**
     * Returns a list of inactive users
     * @return
     */
    @GetMapping("/inactive-users")
    public List<User> displayInactiveUsers() {
        return adminService.getInactiveUsers();
    }

    @PostMapping("/promoteAdmin")
    public void promoteAdmin(@RequestBody String admin) {
        try {
            DbConnection.update("UPDATE testdb.User SET is_admin=1 WHERE email_address='"+admin+"'");
            System.out.println("The user has been promoted to admin.");
        } catch (Exception e) {
            System.out.println(e);
        }

    }

}
