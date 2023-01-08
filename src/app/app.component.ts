import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getOSTheme } from 'src/utilities/helpers';
import { SignalRService } from './signalr.service';
import { setTheme } from './state/actions/ui.actions';
import { AppState } from './state/models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private signalRService: SignalRService, private store: Store<AppState>) {}

  ngOnInit() {
    this.loadTheme();
    this.signalRService.start().then(() => {
      this.signalRService.configure();
    });
  }

  loadTheme() {
    const theme = window.localStorage.getItem('theme') ?? getOSTheme();
    this.store.dispatch(setTheme({theme: theme}));
  }
}
