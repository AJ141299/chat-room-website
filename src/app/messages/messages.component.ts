import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/models/models';
import { selectAllMessages, selectJoiningUsers, selectTypingUsers } from '../state/selectors/ui.selectors';
import { trigger, style, animate, transition } from '@angular/animations';
import { SignalRService } from '../signalr.service';
import { first, tap } from 'rxjs';
import { selectUsername } from '../state/selectors/user.selectors';

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
        animate('200ms ease', style({ opacity: 1, transform: "translateY(0%)" }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: "translateY(0%)" }),
        animate('200ms ease', style({ opacity: 1, transform: "translateY(-20%)" }))
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
  currentUsername$ = this.store.select(selectUsername);
  joiningUsers$ = this.store.select(selectJoiningUsers);
  joiningUser: string | null;

  constructor(private store: Store<AppState>, private signalRService: SignalRService) { }

  ngOnInit() {
    this.currentUsername$.subscribe((username: string) => {
      this.signalRService.announceJoin(username);
    });

    this.joiningUsers$.pipe(
      tap((users) => {
        if (!users.length) {
          this.joiningUser = null;
        } else {
          this.joiningUser = users[users.length - 1];
        }
      }))
    .subscribe();
  }
}
