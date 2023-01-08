import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Announcement, AnnounceType, AppState } from '../state/models/models';
import { selectAllMessages, selectAnnouncements, selectConnectedCount, selectTypingUsers } from '../state/selectors/ui.selectors';
import { trigger, style, animate, transition } from '@angular/animations';
import { SignalRService } from '../signalr.service';
import { tap } from 'rxjs';

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
  usersCount$ = this.store.select(selectConnectedCount);
  announcements$ = this.store.select(selectAnnouncements);
  announcement: Announcement | null;
  announcementType = AnnounceType;

  constructor(private store: Store<AppState>, private signalRService: SignalRService) { }

  ngOnInit() {
    this.announcements$.pipe(
      tap((announcements) => {
        if (!announcements.length) {
          this.announcement = null;
        } else {
          this.announcement = announcements[announcements.length - 1];
        }
      }))
    .subscribe();
  }
}
