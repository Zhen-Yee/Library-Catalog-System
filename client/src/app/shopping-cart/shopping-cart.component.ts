import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { CheckoutComponent } from "../checkout/checkout.component";
import { MatDialog, MatTableDataSource, MatSnackBar } from "@angular/material";
import { CartService } from '../_services/CartService';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { CatalogItem } from "../_models/catalog/catalogItem.model";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: "shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
  entryComponents: [CheckoutComponent],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})

export class ShoppingCartComponent implements OnInit {

  constructor(private router: Router, private snackBar: MatSnackBar, private cart: CartService, private user: UserService, public dialog: MatDialog, private http: HttpClient) { }

  cartArray = [];
  columnsToDisplay: string[] = ["itemType", "qtyInStock", "qtyOnLoan", "title", "quantity"];
  expandedElement: CatalogItem[];
  dataSource: MatTableDataSource<CatalogItem>;
  isCheckingOut = false;
  editing = false;


  ngOnInit() {
    this.cartArray = this.cart.cart
    this.dataSource = new MatTableDataSource(this.cartArray);
  }

  authenticated() {
    return this.user.authenticated;
  }

  // Checkout method with dummy route in backend
  checkout() {
    // console.log(this.cart.cart)
    // this.isCheckingOut = true;
    // this.http.post("http://localhost:8090/catalog/checkout", this.cart)
    //   .subscribe(response => {
    //     if (response) {
    //       this.isCheckingOut = false;
    //       this.openSnackBar("Checkout complete!", "Close");
    //       this.cart.setCartItem(new Array());
    //       this.cartArray = [];
    //     } else {
    //       this.isCheckingOut = false;
    //       this.openSnackBar("Checkout Error.", "Close");
    //     }
    //   })

      this.isCheckingOut = true;
      this.http.post("http://localhost:8090/catalog/checkout", this.cart)
       .subscribe((confirmation) => {
         this.router.navigate(["/"]);
         if (confirmation) {
           this.isCheckingOut = false;
           this.cart.emptyCart();
           this.cartArray = [];
           this.openSnackBar("Transaction Completed!", "Close");
         } else {
           this.isCheckingOut = false;
           this.openSnackBar("Error with Transaction", "Close");
         }
       });
  }

  removeItem(id: number) {
    console.log(this.cartArray);
    console.log(id);
    this.cartArray = this.cartArray.filter((item) => item.id != id)
    console.log(this.cartArray)
    this.dataSource = new MatTableDataSource(this.cartArray);
    this.cart.setCartItem(this.cartArray);
    this.openSnackBar("Item removed!", "Close");
  }

  saveQuantity(id: number, newItem: CatalogItem) {
    // remove old item from cart and add item with updated quantity
    this.cartArray = this.cartArray.filter((item) => item.id != id);
    this.cartArray.push(newItem);
    this.dataSource = new MatTableDataSource(this.cartArray);
    this.cart.setCartItem(this.cartArray);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message , action, {
      duration: 5000,
    });
  }

}
