import { Component,  OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {ActiveUsersSideNavComponent} from "../active-users-side-nav/active-users-side-nav.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: "header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {}

  redirectRegistrationPage() {
    this.router.navigate(['/register']);
  }

  redirectHome() {
    this.router.navigate(['/']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  toggle() {
    ActiveUsersSideNavComponent;
  }

}

