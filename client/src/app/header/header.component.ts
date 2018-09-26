import { Component,  OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material";
import {LoginComponent} from "../login/login.component";
import {AppService} from "../app.service";
import {HttpClient} from "@angular/common/http";
import { finalize } from "rxjs/operators";

@Component({
  selector: "header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private app: AppService, private http: HttpClient) {
    this.app.authenticate(undefined, undefined);
  }

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

  logout() {
    this.http.post('logout', {}).pipe(
      finalize(() => {
        this.app.authenticated = false;

        // add step to set user to inactive


        this.router.navigateByUrl('');
      })
    ).subscribe();
  }

  authenticated() {
    return this.app.authenticated;
  }

}

