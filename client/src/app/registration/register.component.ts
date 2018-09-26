import { Component, OnInit } from "@angular/core";
import {FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/User.models";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

  userArray;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  register(firstName: string, lastName: string, phone: string, email: string, address: string, city: string, provState: string, country: string, postal: string) {
    const user: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address + ' ' + city + ', ' + provState + ", " + country + " " + postal,
      phone: phone,
      username: '',
      password: '',
      is_admin: false,
      is_active: false
    };

    this.http
      .post<User>("http://localhost:8090/addUser", user)
      .subscribe(user => this.userArray = user);
  }
/*
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  } */

}

