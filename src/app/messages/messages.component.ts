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
import { debounceTime, Observable, Subject, takeUntil, tap } from 'rxjs';
import { loadMessages, removeTypingUser } from '../state/actions/ui.actions';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../app.component';

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
        style({ opacity: 0, transform: 'translateY(-20%)' }),
        animate(
          '200ms ease',
          style({ opacity: 1, transform: 'translateY(0%)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0%)' }),
        animate(
          '200ms ease',
          style({ opacity: 0, transform: 'translateY(-20%)' })
        ),
      ]),
    ]),
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60%)' }),
        animate(
          '200ms ease',
          style({ opacity: 1, transform: 'translateY(0%)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0%)' }),
        animate(
          '200ms ease',
          style({ opacity: 0, transform: 'translateY(60%)' })
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
  announcementType = AnnounceType;
  stickScrollToBottom: boolean = true;
  loadingComplete: boolean = false;

  typingUsers$ = this.store.select(selectTypingUsers);
  usersCount$ = this.store.select(selectConnectedCount);
  clearAnnouncement = new Subject<boolean>();
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  announcements$: Observable<Announcement[]> =
    this.store.select(selectAnnouncements);
  messages$ = this.store.select(selectAllMessages);

  @ViewChild('messagesContainer') private messagesContainer: ElementRef;

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  ngOnInit() {
    // clears typing status in the event of target client losing connection and never returning false typing status
    this.typingUsers$
      .pipe(debounceTime(1100), takeUntil(this.unsubscribe$))
      .subscribe((status) => {
        if (status.length) {
          this.store.dispatch(removeTypingUser(status.at(status.length - 1)!));
        }
      });

    this.http
      .get(baseUrl + '/messages/get-messages')
      .subscribe((messages: any) => {
        this.store.dispatch(loadMessages({ messages: messages }));
        this.loadingComplete = true;
      });
  }

  ngAfterViewChecked() {
    if (this.stickScrollToBottom && this.loadingComplete) {
      this.scrollToBottom();
    }
  }

  onScroll(event: any) {
    if (
      Math.ceil(event.target.offsetHeight + event.target.scrollTop) >=
      event.target.scrollHeight
    ) {
      this.stickScrollToBottom = true;
    } else {
      this.stickScrollToBottom = false;
    }
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTo({
        left: 0,
        top: this.messagesContainer.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
  }
}
