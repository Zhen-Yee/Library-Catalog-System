import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/User.models";
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material";
import { ConfirmationComponent } from  "./confirmation.component";
import { PasswordService } from "../_services/registration/PasswordService";
import {ChangeDetectorRef} from '@angular/core';
import { RegistrationErrorComponent } from "./registration_error.component";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  entryComponents: [RegistrationErrorComponent, ConfirmationComponent]
})
export class RegisterComponent implements OnInit {
  temporary_password;
  successful;

  constructor(private router: Router, private http: HttpClient, public dialog: MatDialog, private password: PasswordService, private ref: ChangeDetectorRef) {}

  ngOnInit() {

    this.password.currentPassword.subscribe(temporary_password => this.temporary_password = temporary_password);

  }

  register(firstName: string, lastName: string, phone: string, email: string, address: string, city: string, provState: string, country: string, postal: string) {
    
    
    var temp = this.generatePassword();
    this.password.changePassword(temp)
    const user: User = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      address: address + ' ' + city + ' ' + provState + " " + country + " " + postal,
      username: '',
      password: temp,
      is_admin: false,
      is_active: false
    };

    this.http
      .post<boolean>("http://localhost:8090/addUser", user)
      .subscribe( answer=> this.successful = answer)
      
      console.log(this.successful);
      this.openConfirmationDialog();
  }

  generatePassword() {
    var length = 5,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        tempPass = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        tempPass += charset.charAt(Math.floor(Math.random()*n));
    }
    return tempPass;


    
}

openConfirmationDialog() {

  var dialogRef;
  if (this.successful == true) {
  dialogRef = this.dialog.open(ConfirmationComponent); 

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog result: ${result}'); 
  });

  } 

  else {
  dialogRef = this.dialog.open(RegistrationErrorComponent); 

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog result: ${result}'); 
  });}
  } 


}  



