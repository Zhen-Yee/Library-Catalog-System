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

    @PostMapping("/updateMagazine")
    public void updateMagazine(@RequestBody Magazine magazine) {
        System.out.println(magazine);
    }

    @PostMapping("/deleteMovie")
    public void deleteMovie(@RequestBody long movie) {
        catalog.deleteMovie(movie);
    }
    
    @PostMapping("/deleteBook")
    public void deleteBook(@RequestBody Book book){
        catalog.deleteCatalogItem(book);
    }

    @PostMapping("/deleteMagazine")
    public void deleteBook(@RequestBody Magazine magazine){
        catalog.deleteCatalogItem(magazine);
    }

    @PostMapping("/deleteMusic")
    public void deleteMusic(@RequestBody Music music){
        catalog.deleteCatalogItem(music);
    }
}
