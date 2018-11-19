import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {User} from "../../models/User.models";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: "app-promote-user",
  templateUrl: "./promote-user.component.html",
  styleUrls: ["./promote-user.component.css"]
})
export class PromoteUserComponent implements OnInit {

  nonAdminArray = [];
  isDataLoaded;
  selected;

  constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getNonAdminUsers().subscribe(x => {
      this.nonAdminArray = x;
      this.isDataLoaded = true;
    });
  }

  promote(sendThis: string) {
    const x: string = sendThis;
    // use a subscribe when doing an http call otherwise the call wont work
    this.http
      .post("http://localhost:8090/admin/promoteAdmin", x).subscribe((confirmation) => {
      this.router.navigate(["/promote"]);
      if (confirmation) {
        this.selected = "";
        this.isDataLoaded = false;
        this.getNonAdminUsers().subscribe(x => {
          this.nonAdminArray = x;
          this.isDataLoaded = true;
        });
        this.openSnackBar(x + " has been promoted to admin", "Close");
      } else {
        this.openSnackBar(x + " could not be promoted to admin", "Close");
      }
    });

    /* keep this section for future sprints:
     * give feedback to whether user is found/promoted or
     * user is NOT found/promoted OR
     * user is found/already promoted
      .subscribe(sent =>
      { console.log(sent);
        this.snackBar.openFromComponent(HomePageComponent, {
          data: "Promoted",
          duration: 500,
        });
      }
     );
     */

  }

  getNonAdminUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8090/admin/nonadmin-users");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message , action, {
      duration: 5000,
    });
  }

}
