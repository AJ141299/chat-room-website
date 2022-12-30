import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, withLatestFrom } from "rxjs";
import { sendMessage } from "../actions/ui.actions";
import { AppState } from "../models/models";
import { SignalRService } from "src/app/signalr.service";
import { selectRecentlySentMessage } from "../selectors/ui.selectors";

@Injectable()
export class UiEffects {
    recentlySentMessages$ = this.store.select(selectRecentlySentMessage);

    constructor(
        private actions$: Actions,
        private signalRService: SignalRService,
        private store: Store<AppState>
    ) { }

    sendMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                sendMessage
            ),
            withLatestFrom(this.recentlySentMessages$),
            tap(([_, recentlySentMessage]) => {
                this.signalRService.sendMessage(recentlySentMessage);
            })
        ),
        {dispatch: false}
    );
}
