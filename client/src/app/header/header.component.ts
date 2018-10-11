import { Component,  OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material";
import {LoginComponent} from "../login/login.component";
import {HttpClient} from "@angular/common/http";
import { finalize } from "rxjs/operators";
import {UserService} from "../_services/user.service";

@Component({
  selector: "header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient, private user: UserService) {
  }

  ngOnInit() {}

  redirectRegistrationPage() {
    this.router.navigate(['/register']);
  }

  redirectHome() {
    this.router.navigate(['/']);
  }

  redirectCatalogPage() {
    this.router.navigate(['/catalog']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  logout() {
    this.user.authenticated = false;
    this.router.navigateByUrl('');
    this.http.post<Boolean>('http://localhost:8090/logoutUser', this.user.userEmail).pipe(
      finalize(() => {
        this.user.authenticated = false;
        this.user.adminStatus(false);
        this.user.changeUser("","");
        this.router.navigateByUrl('');
      })
    ).subscribe();
  }

  authenticated() {
    return this.user.authenticated;
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  redirectToDeleteItemPage() {
    this.router.navigate(["/deleteitem"]);
  }

}

