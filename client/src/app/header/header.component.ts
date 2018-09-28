import { Component,  OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material";
import {LoginComponent} from "../login/login.component";
import {AppService} from "../app.service";
import {HttpClient} from "@angular/common/http";
import { finalize } from "rxjs/operators";
import {UserService} from "../_services/user.service";

@Component({
  selector: "header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private app: AppService,
              private http: HttpClient, private user: UserService) {
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
    this.app.authenticated = false;
    this.router.navigateByUrl('');
    this.http.post<Boolean>('http://localhost:8090/logoutUser', this.user).pipe(
      finalize(() => {
        this.app.authenticated = false;
        this.user.isAdmin = false;
        this.router.navigateByUrl('');
      })
    ).subscribe();
  }

  authenticated() {
    return this.app.authenticated;
  }

}

