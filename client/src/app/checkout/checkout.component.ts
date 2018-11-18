import { Component,  OnInit } from "@angular/core";
import {UserService} from "../_services/user.service";
import { MatDialog } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { CartService } from "src/app/_services/CartService";

@Component({
  selector: "checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {

  constructor(private user: UserService, public dialog: MatDialog, private http: HttpClient, public snackBar: MatSnackBar,  private cart: CartService) {}

  ngOnInit() {}

  authenticated() {
    return this.user.authenticated;
  }

  completeTransaction() {
      this.http.post("http://localhost:8090/checkout", this.cart)
        .subscribe((confirmation) => {
          if (confirmation) {
            this.openSnackBar("Transaction Completed!", "Close");
          } else {
            this.openSnackBar("Error with Transaction", "Close");
          }
        });
    

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message , action, {
      duration: 5000,
    });
  }

 
  

}
