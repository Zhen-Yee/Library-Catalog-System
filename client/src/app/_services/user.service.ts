import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../../models/User.models";

@Injectable()
export class UserService {

  isAdmin = false;
  user: User;

  constructor(private http: HttpClient) {
  }

  setUser(userToSet: User) {
    this.user = userToSet;
    if (userToSet.is_admin) {
      this.isAdmin = userToSet.is_admin;
      console.log(userToSet.firstName + "Is an Admin")
    }
  }


}
