import { Component,  OnInit } from "@angular/core";
import {UserService} from "../_services/user.service";
import {CheckoutComponent} from "../checkout/checkout.component";
import { MatDialog } from "@angular/material";
import { CartService } from "../_services/CartService";

@Component({
  selector: "shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
  entryComponents: [CheckoutComponent]
})
export class ShoppingCartComponent implements OnInit {

  constructor(private user: UserService, public dialog: MatDialog, private cart: CartService) {}

  ngOnInit() {}

  authenticated() {
    return this.user.authenticated;
  }

  checkout()
  {
    this.dialog.open(CheckoutComponent);
  }

}
