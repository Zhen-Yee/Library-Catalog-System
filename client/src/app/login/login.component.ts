import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from "../app.service";
import { MatDialog } from "@angular/material";
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
      .post<String[]>("http://localhost:8090/validateUser", this.credentials)
      .subscribe( answer => {
        if (!null && (answer[1] = this.credentials.email)) {
          this.app.authenticated = true;
          console.log(answer[2]);
          console.log(answer);
          this.user.adminStatus((answer[2] == '1'));
          console.log("User is validated!");
          this.dialog.closeAll();
          this.router.navigateByUrl('');
        } else {
          console.log("ERROR");
        }
      })
  }
}
