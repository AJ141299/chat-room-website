import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsername } from '../state/actions/user.actions';
import { AppState } from '../state/models/models';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
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
