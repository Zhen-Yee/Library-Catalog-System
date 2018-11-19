import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {User} from "../../models/User.models";
import {Observable} from "rxjs";

@Component({
  selector: "app-promote-user",
  templateUrl: "./promote-user.component.html",
  styleUrls: ["./promote-user.component.css"]
})
export class PromoteUserComponent implements OnInit {

  nonAdminArray = [];
  isDataLoaded;
  selected;
  selectedUser;

  constructor(private http: HttpClient) {
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
      .post("http://localhost:8090/admin/promoteAdmin", x).subscribe(() => {
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

}
