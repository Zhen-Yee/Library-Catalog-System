import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from "../app.service";
import { MatDialog } from "@angular/material";
import {User} from "../../models/User.models";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {email: '', password: ''};

  ngOnInit() {}

  constructor(private router: Router, private http: HttpClient, private app: AppService,
              private dialog: MatDialog, private user: UserService) {}

  login() {

    console.log("input email is " + this.credentials.email);
    console.log("input password is " + this.credentials.password);

    this.http
      .post<User>("http://localhost:8090/validateUser", this.credentials)
      .subscribe( answer => {
        if (!null && (answer.email = this.credentials.email)) {
          this.app.authenticated = true;
          console.log(answer.is_admin
          console.log(answer);
          this.user.adminStatus(answer.is_admin);
          this.user.changeUser(answer);
          console.log("User is validated!");
          this.dialog.closeAll();
          this.router.navigateByUrl('');
        } else {
          console.log("ERROR");
        }
      })
  }
}
