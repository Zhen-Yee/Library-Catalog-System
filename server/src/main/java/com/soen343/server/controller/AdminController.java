package com.soen343.server.controller;

import com.soen343.server.models.User;
import com.soen343.server.services.AdminService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Controller to handle Admin requests
 */
@RestController @CrossOrigin
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

}
