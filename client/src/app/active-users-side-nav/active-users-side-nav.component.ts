import { Component, OnInit } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User.models";
import { forkJoin, Observable, pipe} from "rxjs";
import { concat} from "rxjs/operators";



@Component({
  selector: "active-users-side-nav",
  templateUrl: "./active-users-side-nav.component.html",
  styleUrls: ["./active-users-side-nav.component.css"]
})
export class ActiveUsersSideNavComponent implements OnInit {

  public activeUserArray;
  public inactiveUserArray;
  isLoaded;
  now:number;
  progress:number;


  constructor(private http: HttpClient) {
    setInterval(() => {
      let date = new Date();
      this.now = Date.now();
      this.progress = Math.round((((date.getSeconds())/60)*100));
    }, 1);
  }
  ngOnInit() {
    // const example = this.getActiveUsers().pipe(concat(this.getInactiveUsers()));
    setInterval(() => {
      this.getActiveUsers().subscribe((active) => {
        this.activeUserArray = active;
        this.isLoaded = true;
        this.getInactiveUsers().subscribe((inactive) => {
          this.inactiveUserArray = inactive;
        });
      });
    }, 2000);

  }

  getActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8090/admin/active-users");
  }

  getInactiveUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8090/admin/inactive-users");
  }

  time(date): string {
    let time = date;
    return time.substring(11, 16);
  };

  year(date): string {
    let year = date;
    return year.substring(0,10);
  }




}
