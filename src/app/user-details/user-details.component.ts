import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsername } from '../state/actions/user.actions';
import { AppState } from '../state/models/models';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20%)' }),
        animate(
          '200ms ease',
          style({ opacity: 1, transform: 'translateY(0%)' })
        ),
      ]),
    ]),
  ],
})
export class UserDetailsComponent {
  username: FormControl = new FormControl();

  constructor(private store: Store<AppState>) {}

  setUsername() {
    const username = this.username.getRawValue();

    if (username == '' || username == null || username == undefined) {
      return;
    }

    this.store.dispatch(setUsername({username: username}));
  }
}
