import { Injectable } from '@angular/core';
import {CatalogItem} from "../_models/catalog/catalogItem.model";

@Injectable()
export class CartService {

    cart = [];

    constructor() {}

    addtoCart(item: CatalogItem) {
        
        var found = false;

        var i;
        for (i = 0; i < this.cart.length; i++) { 
            if (item.id == this.cart[i]["key"]["id"] && item.itemType == this.cart[i]["key"]["itemType"]){
                if (this.cart[i]["key"]["qtyInStock"] <= this.cart[i]["value"])
                {
                    return "Reached limit";
                }
            this.cart[i]["value"]++;
            console.log("Added "+ this.cart[i]["key"]["title"]);
            found = true;
        
            return "Added to Cart";}
        }
       
        if (found == false){
        this.cart.push({key: item, value: 1});

        return "Added to Cart";
    
    }
        
    }

}
