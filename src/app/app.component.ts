import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getOSTheme } from 'src/utilities/helpers';
import { SignalRService } from './signalr.service';
import { receiveMessage, setTheme } from './state/actions/ui.actions';
import { AppState, Message } from './state/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-room-website';

  constructor(private signalRService: SignalRService, private store: Store<AppState>) {}

  ngOnInit() {
    this.loadTheme()

    this.signalRService.connection.start().then(() => {
      console.log("Connected!!")
      this.signalRService.connection.on('receiveMessage', (message: Message) => {
        console.log("Message received!")
        this.store.dispatch(receiveMessage(message));
      })
    });
  }

  loadTheme() {
    const theme = window.localStorage.getItem('theme') ?? getOSTheme();
    this.store.dispatch(setTheme({theme: theme}))
  }
}
