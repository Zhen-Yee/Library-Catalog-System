import { Component,  OnInit } from "@angular/core";
import {UserService} from "../_services/user.service";

@Component({
  selector: "home-page",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomePageComponent implements OnInit {
  username;
  constructor(private user: UserService) {}

  ngOnInit() {}

  authenticated() {
    return this.user.authenticated;
  }

}
