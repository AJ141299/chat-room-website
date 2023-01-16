import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getOSTheme } from 'src/utilities/helpers';
import { SignalRService } from './signalr.service';
import { setTheme } from './state/actions/ui.actions';
import { AppState } from './state/models/models';

export const baseUrl: string = "https://localhost:3232";
// export const baseUrl: string = "https://chat-room-server20230107234625.azurewebsites.net:443";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadingComplete: boolean = false;

  constructor(private signalRService: SignalRService, private store: Store<AppState>) {}

  ngOnInit() {
    this.loadTheme();
    this.signalRService.start().then(() => {this.loadingComplete = true});
  }

  loadTheme() {
    const theme = window.localStorage.getItem('theme') ?? getOSTheme();
    this.store.dispatch(setTheme({theme: theme}));
  }
}
