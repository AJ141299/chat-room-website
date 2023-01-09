import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { UsernameExists } from "./canActivateMessagesPage";

@Injectable()
export class CanActivateUserPage implements CanActivate {
  constructor(private usernameExists: UsernameExists) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return !this.usernameExists.exists();
  }
}
