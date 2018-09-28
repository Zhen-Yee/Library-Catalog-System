import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private http: HttpClient, private dialog: MatDialog, private user: UserService) {}

  login() {

    console.log("input email is " + this.credentials.email);
    console.log("input password is " + this.credentials.password);

    this.http
      .post<String[]>("http://localhost:8090/validateUser", this.credentials)
      .subscribe( answer => {
        if (!null && (answer[1] = this.credentials.email)) {
          this.user.authenticated = true;
          this.user.adminStatus((answer[2] == '1'));
          this.user.changeUser(answer[0], answer[1]);
          this.dialog.closeAll();
          this.router.navigateByUrl('');
        } else {
          console.log("ERROR");
        }
      })
  }
}
