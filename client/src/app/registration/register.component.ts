import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/User.models";
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material";
import { ConfirmationComponent } from  "./confirmation.component";
import { PasswordService } from "../_services/registration/PasswordService";
import { ChangeDetectorRef } from '@angular/core';
import { RegistrationErrorComponent } from "./registration_error.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  entryComponents: [RegistrationErrorComponent, ConfirmationComponent]
})
export class RegisterComponent implements OnInit {
  temporary_password;
  successful;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient, public dialog: MatDialog, private password: PasswordService, private ref: ChangeDetectorRef) {}

  ngOnInit() {


    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      address: ['', Validators.required],
      city: ['', Validators.required],
      provState:  ['', Validators.required],
      country: ['', Validators.required],
      postal: ['', Validators.required]

  });

    this.password.currentPassword.subscribe(temporary_password => this.temporary_password = temporary_password);

  }

  get f() { return this.registerForm.controls; }


  onSubmit() {

    this.submitted = true;

        if (this.registerForm.invalid) {
          console.log('Form invalid');
            return;
        }

        console.log('Form valid.');
    
    
    var temp = this.generatePassword();
    this.registerForm.get('firstName')
    this.password.changePassword(temp)
    const user: User = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      phone: this.registerForm.get('phone').value,
      email: this.registerForm.get('email').value,
      address: this.registerForm.get('address').value + " " + this.registerForm.get('city').value,
      username: '',
      password: temp,
      is_admin: false,
      is_active: false
    };

    this.http
      .post<boolean>("http://localhost:8090/addUser", user)
      .subscribe( answer=> {this.successful = answer;
        this.openConfirmationDialog();}) 
      
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



