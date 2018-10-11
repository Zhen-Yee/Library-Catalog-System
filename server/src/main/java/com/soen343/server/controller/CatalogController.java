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
    public void addBook(@RequestBody Book book){
        catalog.addCatalogItem(book);
    }

    @PostMapping("/addMagazine")
    public void addMagazine(@RequestBody Magazine magazine){
        catalog.addCatalogItem(magazine);
    }

    @PostMapping("/addMusic")
    public void addMagazine(@RequestBody Music music){
        catalog.addCatalogItem(music);
    }

    @PostMapping("/addMovie")
    public void addMovie(@RequestBody Movie movie) {
        catalog.addCatalogItem(movie);
    }
}
