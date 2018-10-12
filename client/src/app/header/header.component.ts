import { Component,  OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import {LoginComponent} from "../login/login.component";
import {HttpClient} from "@angular/common/http";
import { finalize } from "rxjs/operators";
import {UserService} from "../_services/user.service";
import { ToggleService } from "../_services/ToggleService";

@Component({
  selector: "header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  toggling = false;

  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient, private user: UserService, private toggled: ToggleService ) {
  }

  ngOnInit() {

    this.toggled.currentToggle.subscribe(toggling => this.toggling = toggling)

  }

  redirectRegistrationPage() {
    this.router.navigate(["/register"]);
  }

  redirectToPromote() {
    this.router.navigate(["/promote"]);
  }

  redirectHome() {
    this.router.navigate(["/"]);
  }

  redirectCatalogPage() {
    this.router.navigate(["/catalog"]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result: ${result}");
    });
  }

  logout() {
    this.user.authenticated = false;
    this.router.navigateByUrl("");
    this.http.post<Boolean>("http://localhost:8090/logoutUser", this.user.userEmail).pipe(
      finalize(() => {
        this.user.authenticated = false;
        this.user.adminStatus(false);
        this.user.changeUser("", "");
        this.router.navigateByUrl("");
      })
    ).subscribe();
  }

  authenticated() {
    return this.user.authenticated;
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  redirectToAddPage() {
    this.router.navigate(["/add"]);
  }

  toggle(){
    if (this.toggling) {
      this.toggled.changeToggle(false);}
      else {
        this.toggled.changeToggle(true);
      }
  }

}

