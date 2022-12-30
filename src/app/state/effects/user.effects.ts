import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { setUsername } from "../actions/user.actions";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private router: Router
    ) { }

    usernameSet$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
              setUsername
            ),
            tap(() => {
                this.router.navigate(['/messages']);
            })
        ),
        {dispatch: false}
    );
}
