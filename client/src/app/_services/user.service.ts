import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  authenticated = false;
  isAdmin = false;
  userName = "";
  userEmail = "";

  constructor() {
  }

  adminStatus(adminStatus: Boolean) {
    this.isAdmin = adminStatus.valueOf();
  }

  changeUser(userName: String, userEmail: String) {
    this.userName = userName.toString();
    this.userEmail = userEmail.toString();
  }
}
