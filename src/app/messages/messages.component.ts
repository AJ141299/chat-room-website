import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/models/models';
import { selectAllMessages } from '../state/selectors/ui.selectors';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messages$ = this.store.select(selectAllMessages);

  constructor(private store: Store<AppState>) {}
}
