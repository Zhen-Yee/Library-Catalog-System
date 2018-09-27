import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from "../app.service";
import { Observable } from "rxjs";
import {ChangeDetectorRef} from '@angular/core';
import {User} from "../../models/User.models";
import {Credentials} from "../../models/Credentials.models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userValidated: boolean;
  credentials = {email: '', password: ''};

  constructor(private router: Router, private http: HttpClient,) {}

  login() {

    console.log("inputed email is" + this.credentials.email);
    console.log("input password is" + this.credentials.password);

    this.http
      .post<boolean>("http://localhost:8090/validateUser", this.credentials)
      .subscribe( answer=> {this.userValidated = answer;
      })

    if (this.userValidated) {
      console.log("User is validated!")
    } else {
      console.log("ERROR")
    }
  }
}
