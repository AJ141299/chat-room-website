import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, tap } from 'rxjs';
import { AppState } from '../state/models/models';
import { selectAvailableUsers, selectUsername } from '../state/selectors/user.selectors';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
  currentUsername$ = this.store.select(selectUsername);
  availableUsers$ = combineLatest(this.store.select(selectAvailableUsers), this.currentUsername$).pipe(
    map(([availableUsers, username]) => availableUsers.filter(user => user != username)),
  );

  constructor(private store: Store<AppState>) { }
}
