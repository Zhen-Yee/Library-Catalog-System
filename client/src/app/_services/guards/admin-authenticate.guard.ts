import { UserService } from "./../user.service";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";


/**
 * Guard used in the routing
 * Routes can only be accessed if its an admin
 */
@Injectable()
export class AdminAuthenticateGuard implements CanActivate {
  constructor(private user: UserService) {}

  canActivate(): boolean {
   return this.user.isAdmin;
  }
}
