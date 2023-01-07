import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignalRService } from './signalr.service';
import { receiveMessage } from './state/actions/ui.actions';
import { AppState, Message } from './state/models/models';

const setThemeFromOS = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute("data-theme", "dark")
  } else {
    document.documentElement.setAttribute("data-theme", "light")
  }
}

const setThemeFromStorage = (localTheme: string) => {
  document.documentElement.setAttribute("data-theme", localTheme);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-room-website';

  constructor(private signalRService: SignalRService, private store: Store<AppState>) {}

  ngOnInit() {
    const localTheme: string | null = window.localStorage.getItem('theme')
    localTheme ? setThemeFromStorage(localTheme) : setThemeFromOS();

    this.signalRService.connection.start().then(() => {
      console.log("Connected!!")
      this.signalRService.connection.on('receiveMessage', (message: Message) => {
        console.log("Message received!")
        this.store.dispatch(receiveMessage(message));
      })
    });

    console.log(this.signalRService.connection.state)
  }
}
