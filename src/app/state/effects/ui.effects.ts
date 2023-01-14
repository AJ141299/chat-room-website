import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs';
import { addAnnouncement, removeAnnouncement, sendMessage, setTheme } from '../actions/ui.actions';
import { AppState } from '../models/models';
import { SignalRService } from 'src/app/signalr.service';
import {
  selectRecentlySentMessage,
  selectTheme,
} from '../selectors/ui.selectors';

@Injectable()
export class UiEffects {
  recentlySentMessages$ = this.store.select(selectRecentlySentMessage);
  theme$ = this.store.select(selectTheme);

  constructor(
    private actions$: Actions,
    private signalRService: SignalRService,
    private store: Store<AppState>
  ) {}

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendMessage),
        withLatestFrom(this.recentlySentMessages$),
        tap(([_, recentlySentMessage]) => {
          this.signalRService.sendMessage(recentlySentMessage);
        })
      ),
    { dispatch: false }
  );

  setTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setTheme),
        withLatestFrom(this.theme$),
        tap(([_, theme]) => {
          document.documentElement.setAttribute('data-theme', theme);
          window.localStorage.setItem('theme', theme);
        })
      ),
    { dispatch: false }
  );

  removeAnnouncement$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addAnnouncement),
        tap(() => {
          setTimeout(() => this.store.dispatch(removeAnnouncement()), 3000)
        })
      ),
    { dispatch: false }
  );
}
