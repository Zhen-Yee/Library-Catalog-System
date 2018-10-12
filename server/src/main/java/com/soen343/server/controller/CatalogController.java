package com.soen343.server.controller;

import com.soen343.server.Catalog;
import com.soen343.server.models.catalog.*;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/catalog")
public class CatalogController {

    private Catalog catalog = Catalog.getCatalog();

    @GetMapping("/getAll")
    public ArrayList<CatalogItem> getAllCatalogItems() {
        // Generate initial data to simulate db
        catalog.loadFakeData();
        return catalog.getAllCatalogItems();
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
}
