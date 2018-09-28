import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../../models/User.models";

@Injectable()
export class UserService {

  private isAdminSource = new BehaviorSubject<Boolean>(false);
  isAdmin = this.isAdminSource.asObservable();

  private userSource = new BehaviorSubject<User>(null);
  user = this.userSource.asObservable();

  constructor(private http: HttpClient) {
  }

  adminStatus(adminStatus: Boolean) {
    this.isAdminSource.next(adminStatus);
    console.log("admin status changed to " + adminStatus);
  }

  changeUser(newUser: User) {
    this.userSource.next(newUser);
    console.log("logged in as: " + newUser.firstName);
  }


}
