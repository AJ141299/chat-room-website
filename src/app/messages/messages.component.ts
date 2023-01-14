import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Announcement, AnnounceType, AppState } from '../state/models/models';
import {
  selectAllMessages,
  selectAnnouncements,
  selectConnectedCount,
  selectTypingUsers,
} from '../state/selectors/ui.selectors';
import { trigger, style, animate, transition } from '@angular/animations';
import { BehaviorSubject, debounceTime, interval, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { removeTypingUser } from '../state/actions/ui.actions';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate(
          '200ms ease',
          style({ opacity: 1, transform: 'translateY(0%)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0%)' }),
        animate(
          '200ms ease',
          style({ opacity: 1, transform: 'translateY(-20%)' })
        ),
      ]),
    ]),
    trigger('easeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('20ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MessagesComponent {
  typingUsers$ = this.store.select(selectTypingUsers);
  usersCount$ = this.store.select(selectConnectedCount);
  showAnnouncement: boolean = true;
  announcements$: Observable<Announcement | null> = this.store
    .select(selectAnnouncements)
    .pipe(
      switchMap(
        (
          announcement: Announcement | null
        ): Observable<Announcement | null> => {
          this.showAnnouncement = true;
          setTimeout(() => {this.showAnnouncement = false}, 2000)
          return new Observable<Announcement | null>().pipe(
            startWith(announcement)
          );
        }
      ),
      // tap(() => {setTimeout(() => {this.showAnnouncement$.next(false)}, 2000)})
    );
  messages$ = this.store.select(selectAllMessages).pipe(
    tap(() => {
      this.scrollToBottom();
    })
  );

  @ViewChild('messagesContainer') private messagesContainer: ElementRef;
  announcementType = AnnounceType;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.typingUsers$.pipe(debounceTime(1000)).subscribe((status) => {
      if (status.length) {
        this.store.dispatch(removeTypingUser(status.at(status.length - 1)!));
      }
    });
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
