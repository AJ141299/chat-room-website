import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { AppState } from "../state/models/models";
import { selectUsername } from "../state/selectors/user.selectors";

@Injectable()
export class UsernameExists {
  constructor(private store: Store<AppState>) { }

  exists(): boolean {
    const username$ = this.store.select(selectUsername);
    let usernameExists = true;
    username$.pipe(
      tap((username: string) => {
        if (username == '') {
          usernameExists = false;
        }
      })
    ).subscribe()

    if (usernameExists) {
      return true;
    }
    return false;
  }
}

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
