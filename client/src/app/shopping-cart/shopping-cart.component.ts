import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { CheckoutComponent } from "../checkout/checkout.component";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { CartService } from '../_services/CartService';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { CatalogItem } from "../_models/catalog/catalogItem.model";
import { MatSnackBar } from "@angular/material";
import { HttpClient } from "@angular/common/http";

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

  constructor(private snackBar: MatSnackBar, private cart: CartService, private user: UserService, public dialog: MatDialog, private http: HttpClient) { }

  cartArray = [];
  dataArray: CatalogItem[] = [];
  columnsToDisplay: string[] = ["itemType", "qtyInStock", "qtyOnLoan", "title"];
  expandedElement: CatalogItem[];
  dataSource: MatTableDataSource<CatalogItem>;

  ngOnInit() {
    this.cartArray = this.cart.cart
    this.dataSource = new MatTableDataSource(this.cartArray);
  }

  authenticated() {
    return this.user.authenticated;
  }

  // Checkout method with dummy route in backend
  checkout() {
    console.log(this.cart.cart)
    this.http.post("http://localhost:8090/catalog/testCheckout", "Ding")
      .subscribe(response => {
        if (response) {
          this.openSnackBar("Checkout complete!", "Close");
        } else {
          this.openSnackBar("Checkout Error.", "Close");
        }
      })
  }

  removeItem(id: number) {
    this.cartArray = this.cartArray.filter((item) => item.id != id)
    this.dataSource = new MatTableDataSource(this.cartArray);
    this.cart.setCartItem(this.cartArray);
    this.openSnackBar("Item removed!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message , action, {
      duration: 5000,
    });
  }

}
