import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { AppState } from "src/app/state/models/models";
import { selectUsername } from "src/app/state/selectors/user.selectors";

export const getOSTheme = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? "dark"
    : "light";
}

export const get12HourTime = (date: Date): string => {
  return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

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

