import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { SignalRService } from 'src/app/signalr.service';
import { sendMessage } from 'src/app/state/actions/ui.actions';
import { AppState, Message } from 'src/app/state/models/models';
import { selectUsername } from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent {
  messageControl: FormControl = new FormControl();
  currentUsername: string;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  typingStatus$ = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private signalRService: SignalRService
  ) {
    this.store
      .select(selectUsername)
      .pipe()
      .subscribe((username: string) => {
        this.currentUsername = username;
      });
  }

  ngOnInit() {
    this.typingStatus$
      .pipe(
        tap((status: boolean) => {
          if (status) {
            this.signalRService.sendTypingStatus(true);
          }
        }),
        debounceTime(1000),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.signalRService.sendTypingStatus(false);
      });
  }

  sendMessage() {
    const message: Message = {
      username: this.currentUsername,
      content: this.messageControl.getRawValue(),
      createdAt: new Date().getTime().toString(), // UTC
    };

    if (
      message.content == null ||
      message.content == '' ||
      message.content == undefined
    ) {
      return;
    }

    this.signalRService.sendTypingStatus(false);
    this.store.dispatch(sendMessage(message));
    this.messageControl.reset();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
  }
}
