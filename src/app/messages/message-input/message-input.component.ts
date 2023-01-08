import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { catchError, Observable, of, Subject, tap, timeout } from 'rxjs';
import { SignalRService } from 'src/app/signalr.service';
import { sendMessage } from 'src/app/state/actions/ui.actions';
import { AppState, Message } from 'src/app/state/models/models';
import { selectUsername } from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {
  typingStatus = new Subject<boolean>();
  messageControl: FormControl = new FormControl();
  currentUsername: string;

  constructor(private store: Store<AppState>, private signalRService: SignalRService) {
    this.store.select(selectUsername).pipe().subscribe((username: string) => {
      this.currentUsername = username;
    })

    this.typingStatus.pipe(
      tap((value) => {console.log(value)}))
      .subscribe();
  }

  sendMessage() {
    const message: Message = {
      username: this.currentUsername,
      content: this.messageControl.getRawValue(),
      createdAt: new Date().toUTCString()
    }
    if (message.content == null || message.content == '' ||  message.content == undefined) {
      return;
    }

    this.store.dispatch(sendMessage(message))
    this.messageControl.reset();
  }

  isTyping() {
    this.signalRService.sendTypingStatus(true);
  }

  ngOnDestroy() {
    this.typingStatus.unsubscribe();
  }
}
