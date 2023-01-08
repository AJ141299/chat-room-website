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
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeDown', [
      transition(':enter', [
        style({ opacity: 0, transform: "translateY(-10%)" }),
        animate('200ms', style({ opacity: 1, transform: "translateY(0%)" }))
      ])
    ]),
    trigger('easeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('20ms', style({ opacity: 0 }))
      ])
    ]),
  ],
})
export class MessagesComponent {
  messages$ = this.store.select(selectAllMessages);
  typingUsers$ = this.store.select(selectTypingUsers);

  constructor(private store: Store<AppState>) { }
}
