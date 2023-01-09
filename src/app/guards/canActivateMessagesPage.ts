import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { Observable} from "rxjs";
import { UsernameExists } from "src/utilities/helpers";

@Injectable()
export class CanActivateMessagesPage implements CanActivate {
  constructor(private usernameExists: UsernameExists, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const usernameExists = this.usernameExists.exists();
    if (!usernameExists) {
      this.router.navigate(['/']);
    }
    return usernameExists;
  }
}
