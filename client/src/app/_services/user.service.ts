import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../../models/User.models";

@Injectable()
export class UserService {


  isAdmin = false;
  userName = "";
  userEmail = "";


  // private isAdminSource = new BehaviorSubject<Boolean>(false);
  // isAdmin = this.isAdminSource.asObservable();
  //
  // private userNameSource = new BehaviorSubject<String>("");
  // userName = this.userNameSource.asObservable();
  //
  // private userEmailSource = new BehaviorSubject<String>("");
  // userEmail = this.userEmailSource.asObservable();

  constructor(private http: HttpClient) {
  }

  adminStatus(adminStatus: Boolean) {
    this.isAdmin = adminStatus.valueOf();
    // this.isAdminSource.next(adminStatus);
    console.log("admin status changed to " + adminStatus);
  }

  changeUser(userName: String, userEmail: String) {
    this.userName = userName.toString();
    this.userEmail = userEmail.toString();
    // this.userNameSource.next(userName);
    // this.userEmailSource.next(userEmail);
    console.log("logged in as: " + userName);
  }


}
