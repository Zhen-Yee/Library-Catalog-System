import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User.models";


@Component({
  selector: 'active-users-side-nav',
  templateUrl: './active-users-side-nav.component.html',
  styleUrls: ['./active-users-side-nav.component.css']
})
export class ActiveUsersSideNavComponent implements OnInit {

  public activeUserArray;
  public inactiveUserArray;


  constructor(private http: HttpClient) {}

  ngOnInit() {

    setInterval(() => {
      this.getActiveUsers();
      this.getInactiveUsers();
    }, 2000)

  }

  getActiveUsers() {
    this.http
      .get<User[]>("http://localhost:8090/admin/active-users")
      .subscribe(user => {
        this.activeUserArray = user;
      });
  }

  getInactiveUsers() {
    this.http
      .get<User[]>("http://localhost:8090/admin/inactive-users")
      .subscribe(user => {
        this.inactiveUserArray = user;
      });
  }



}
