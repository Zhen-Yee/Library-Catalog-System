import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { AppService } from "../app.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {email: '', password: ''};

  login() {
    console.log("inputed email is" + this.credentials.email);
    console.log("input password is" + this.credentials.password);
  }
}
