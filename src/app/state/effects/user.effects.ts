import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs';
import { logout, setLoginStatus, setUsername } from '../actions/user.actions';
import { Router } from '@angular/router';
import { SignalRService } from 'src/app/signalr.service';
import { Store } from '@ngrx/store';
import { AppState } from '../models/models';
import { selectUsername } from '../selectors/user.selectors';

@Injectable()
export class UserEffects {
  username$ = this.store.select(selectUsername);

  constructor(
    private actions$: Actions,
    private router: Router,
    private signalRService: SignalRService,
    private store: Store<AppState>
  ) {}

  usernameSet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setUsername),
        withLatestFrom(this.username$),
        tap(([_, username]) => {
          if (username != '') {
            this.store.dispatch(setLoginStatus({ status: true }));
            this.signalRService.addUser(username);
            this.router.navigate(['/available-rooms']);
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.store.dispatch(setLoginStatus({ status: false }));
          this.store.dispatch(setUsername({ username: '' }));
          this.signalRService.logout();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
