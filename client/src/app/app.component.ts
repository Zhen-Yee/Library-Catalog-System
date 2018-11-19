import { Component, OnInit } from "@angular/core";
import { UserService } from "./_services/user.service";
import { ToggleService } from "./_services/ToggleService";
import { CartService } from "./_services/CartService";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  toggled;
  

  ngOnInit() {

  this.toggle.currentToggle.subscribe(toggled => this.toggled = toggled) }

  constructor(private user: UserService, private toggle: ToggleService, private cartService: CartService) {
    
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  isToggle() {
    return this.toggled;
  }
}
