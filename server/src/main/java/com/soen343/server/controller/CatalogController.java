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

    @GetMapping("/getAll")
    public List<CatalogItem> getAllCatalogItems() {
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

    @PostMapping("/updateBook")
    public void updateBook(@RequestBody Book book) {
        System.out.println(book);
    }

    @PostMapping("/updateMusic")
    public void updateMusic(@RequestBody Music music) {
        System.out.println(music);
    }

    @PostMapping("/updateMagazine")
    public void updateMagazine(@RequestBody Magazine magazine) {
        System.out.println(magazine);
    }

}
