package com.soen343.server.controller;

import com.soen343.server.Catalog;
import com.soen343.server.models.catalog.*;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/catalog")
public class CatalogController {

    private Catalog catalog = Catalog.getCatalog();
    
    @GetMapping("/getAll"+"{CatalogItemType}")
    public List<CatalogItem> getAllCatalogItemsByType(@PathVariable String CatalogItemType) {
        return catalog.getAllCatalogItemsByType(CatalogItemType);
    }

    @PostMapping("/addBook")
    public boolean addBook(@RequestBody Book book){
        // checks if book object is good or not
        if(book != null){
        catalog.addCatalogItem(book);
        return true;
        }
        else {
            return false;
        }
    }

    @PostMapping("/addMagazine")
    public void addMagazine(@RequestBody Magazine magazine){
        catalog.addCatalogItem(magazine);
    }

    @PostMapping("/addMusic")
    public void addMusic(@RequestBody Music music){
        catalog.addCatalogItem(music);
    }

    @PostMapping("/addMovie")
    public void addMovie(@RequestBody Movie movie) {
        catalog.addCatalogItem(movie);
    }

    @PostMapping("/updateBook")
    public boolean updateBook(@RequestBody Book book) {
            // checks if book object is good or not
            if (book != null) {
                catalog.updateCatalogItem(book);
                return true;
            } else {
                return false;
            }
    }

    @PostMapping("/updateMusic")
    public boolean updateMusic(@RequestBody Music music) {
        // Check if Music object sent from front-end is null
        System.out.println("Reached music Endpoint");
        if (music != null) {
            catalog.updateCatalogItem(music);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/updateMovie")
    public boolean updateMagazine(@RequestBody Movie movie) {
        // Check if Movie object sent from front-end is null
        if (movie != null) {
            catalog.updateCatalogItem(movie);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/updateMagazine")
    public boolean updateMagazine(@RequestBody Magazine magazine) {
            // checks if magazine object is good or not
            if (magazine != null) {
                catalog.updateCatalogItem(magazine);
                return true;
            } else {
                return false;
            }
    }

    @PostMapping("/deleteMovie")
    public boolean deleteMovie(@RequestBody Movie movie) {
            if (movie != null) {
                catalog.deleteCatalogItem(movie);
                return true;
            } else {
                return false;
            }
    }
    
    @PostMapping("/deleteBook")
    public boolean deleteBook(@RequestBody Book book){
            if (book != null) {
                catalog.deleteCatalogItem(book);
                return true;
            } else {
                return false;
            }
    }

    @PostMapping("/deleteMagazine")
    public boolean deleteBook(@RequestBody Magazine magazine){
            if (magazine != null) {
                catalog.deleteCatalogItem(magazine);
                return true;
            } else {
                return false;
            }
    }

    @PostMapping("/deleteMusic")
    public boolean deleteMusic(@RequestBody Music music){
            if (music != null) {
                catalog.deleteCatalogItem(music);
                return true;
            } else {
                return false;
            }
    }
}
