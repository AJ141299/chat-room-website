import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignalRService } from 'src/app/signalr.service';
import { sendMessage } from 'src/app/state/actions/ui.actions';
import { AppState, Message } from 'src/app/state/models/models';

@Component({
  selector: 'message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent {
  messageControl: FormControl = new FormControl();

  constructor(private store: Store<AppState>) {}

  sendMessage() {
    const message: Message = {
      username: Math.random().toString(),
      content: this.messageControl.getRawValue(),
      createdAt: new Date().toUTCString()
    }
    if (message.content == null || message.content == '' ||  message.content == undefined) {
      return;
    }

    this.store.dispatch(sendMessage(message))
    this.messageControl.reset();
  }
}
