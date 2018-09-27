import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User.models";
import {Observable} from 'rxjs';


@Component({
  selector: 'active-users-side-nav',
  templateUrl: './active-users-side-nav.component.html',
  styleUrls: ['./active-users-side-nav.component.css']
})
export class ActiveUsersSideNavComponent implements OnInit {

  public activeUserArray;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    setInterval(() => {
      this.getActiveUsers();
    }, 5000)

  }

  getActiveUsers() {
    this.http
      .get<User[]>("http://localhost:8090/admin/displayActiveUsers")
      .subscribe(user => {
        this.activeUserArray = user;
        console.log("HELLO " + this.activeUserArray);
      });
  }



}
