import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { changeTheme } from '../state/actions/ui.actions';
import { logout} from '../state/actions/user.actions';
import { AppState } from '../state/models/models';
import { selectTheme } from '../state/selectors/ui.selectors';
import { selectLoginStatus } from '../state/selectors/user.selectors';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentTheme$: Observable<string> = this.store.select(selectTheme);
  isLoggedIn$: Observable<boolean> = this.store.select(selectLoginStatus);

  constructor(
    private store: Store<AppState>) {}

  changeTheme() {
    this.store.dispatch(changeTheme());
  }

  logout() {
    this.store.dispatch(logout());
  }
}
