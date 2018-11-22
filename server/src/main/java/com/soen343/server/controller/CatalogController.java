package com.soen343.server.controller;

import com.soen343.server.Catalog;
import com.soen343.server.models.SearchCriteria;
import com.soen343.server.models.Transaction;
import com.soen343.server.models.catalog.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/catalog")
public class CatalogController {

    private Catalog catalog = Catalog.getCatalog();

    @GetMapping("/getAll"+"{CatalogItemType}")
    public List<CatalogItem> getAllCatalogItemsByType(@PathVariable String CatalogItemType) {
        return catalog.getAllCatalogItemsByType(CatalogItemType);
    }

    @GetMapping("/getMap")
    public Map<Long, CatalogItem> getMapCatalogItem() {
        return catalog.getIdentityMap();
    }

    @GetMapping("/allTransactions")
    public List<Transaction> getAllTransactions(){
        return catalog.getAllTransactions();
    }
    
    /*
    @GetMapping("/getAllLoanedItems")
    public List<CatalogItem> getCatalogItemFromID(@PathVariable List<Long> ids) {
        return catalog.getCatalogItemFromID(ids);
    }
    

    @PostMapping("/getAllLoanedItems")
    public List<CatalogItem> getCatalogItemFromID(@RequestBody List<Long> ids){
    try{
        return catalog.getCatalogItemFromID(ids);
    } 
    catch(Exception exception){
        System.out.print(exception);
        return null;
}
    }
    

    @GetMapping("/getAllLoanedItems")
    public List<CatalogItem> getCatalogItemFromID(@PathVariable List<Long> TransactionGateway.getAllLoanedItems) {
        return catalog.getCatalogItemFromID(getAllLoanedItems);
    }
    */

    @PostMapping("/addBook")
    public boolean addBook(@RequestBody Book book){
        // checks if book object is good or not
        if (book != null) {
            catalog.addCatalogItem(book);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/addMagazine")
    public boolean addMagazine(@RequestBody Magazine magazine){
        if (magazine != null) {
            catalog.addCatalogItem(magazine);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/addMusic")
    public boolean addMusic(@RequestBody Music music){
        if (music != null) {
            catalog.addCatalogItem(music);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/addMovie")
    public boolean addMovie(@RequestBody Movie movie) {
        if (movie != null) {
            catalog.addCatalogItem(movie);
            return true;
        } else {
            return false;
        }
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


    @PostMapping("/search")
    public Map<Long, CatalogItem> search(@RequestBody SearchCriteria searchCriteria) {

        try{
            System.out.print("Entered CatalogController");
            return catalog.search(searchCriteria);
        } catch(Exception exception){
            System.out.print(exception);
            return null;
        }
    }

    @PostMapping("/checkout")
    public Boolean checkout(@RequestBody String cart) {
        JSONObject jsonObject = new JSONObject(cart);
        JSONObject userMap = (JSONObject) jsonObject.get("user");
        JSONArray cartMap = (JSONArray) jsonObject.get("cart");
        return catalog.checkout(userMap.getString("userEmail"), catalog.cartMapToList(cartMap));
    }

    @PostMapping("/testCheckout")
    public boolean testCheckout(@RequestBody String item) {
            System.out.println(item);
        return true;
    }

    @PostMapping("/userTransactions")
    public List<Transaction> getuserTransactions(@RequestBody String userEmail){
    try{
        return catalog.getuserTransactions(userEmail);
    } 
    catch(Exception exception){
        System.out.print(exception);
        return null;
}
    }

    @PostMapping("/allLoanedItems")
    public List<Transaction> getAllLoanedItems(@RequestBody String userEmail){
    try{
        return catalog.getuserTransactions(userEmail);
    } 
    catch(Exception exception){
        System.out.print(exception);
        return null;
}
    }

    @PostMapping("/returnBook")
    public boolean returnBook(@RequestBody Book book){
        if (book != null) {
            catalog.returnCatalogItem(book);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/returnMusic")
    public boolean returnMusic(@RequestBody Music music){
        if (music != null) {
            catalog.returnCatalogItem(music);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/returnMovie")
    public boolean returnMovie(@RequestBody Movie movie) {
        if (movie != null) {
            catalog.returnCatalogItem(movie);
            return true;
        } else {
            return false;
        }
    }
}
