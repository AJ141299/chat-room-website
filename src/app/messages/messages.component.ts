import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/models/models';
import { selectAllMessages, selectTypingUsers } from '../state/selectors/ui.selectors';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: "translateY(-10%)" }),
        animate('200ms', style({ opacity: 1, transform: "translateY(0%)" }))
      ])
    ]),
  ],
})
export class MessagesComponent {
  messages$ = this.store.select(selectAllMessages);
  typingUsers$ = this.store.select(selectTypingUsers);

  constructor(private store: Store<AppState>) { }
}
