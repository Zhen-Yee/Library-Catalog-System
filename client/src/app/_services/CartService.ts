import { Injectable } from '@angular/core';
import {CatalogItem} from "../_models/catalog/catalogItem.model";
import {UserService} from "./user.service";

@Injectable()
export class CartService {

    cart = [];
    id = 0;
  
    constructor(private user: UserService) {}

    addtoCart(item: CatalogItem) {
        
        var found = false;
        
        var i;
        for (i = 0; i < this.cart.length; i++) { 
            if (item.id == this.cart[i]["catalogItem"]["id"] && item.itemType == this.cart[i]["catalogItem"]["itemType"]){
                if (this.cart[i]["catalogItem"]["qtyInStock"] <= this.cart[i]["quantity"])
                {
                    return "Reached limit";
                }
            this.cart[i]["quantity"]++;
            console.log("Added "+ this.cart[i]["catalogItem"]["title"]);
            found = true;
        
            return "Added to Cart";}
        }
       
        if (found == false){
        this.cart.push({id: this.id, user: this.user.userEmail, catalogItem: item, quantity: 1});
        this.id++;
        return "Added to Cart";
    
    }
        
    }


    setCartItem(cart) {
        this.cart = cart;

    emptyCart(){
        this.cart = [];

    }

}
