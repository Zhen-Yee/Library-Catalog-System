import { Component, OnInit } from "@angular/core";
import { PasswordService } from "../_services/registration/PasswordService";
import { Router } from '@angular/router';

@Component({
  selector: "app-register-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.css"]
})
export class ConfirmationComponent implements OnInit {

  temporary_password: string;

  constructor(private password: PasswordService) {}

  ngOnInit() {

    this.password.currentPassword.subscribe(temporary_password => this.temporary_password = temporary_password);

  }

  

}

