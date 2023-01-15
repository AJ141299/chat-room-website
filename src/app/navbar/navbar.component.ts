import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignalRService } from '../signalr.service';
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
    private store: Store<AppState>, private signalRService: SignalRService) {}

  clearMessages() {
    this.signalRService.clearMessages();
  }

  changeTheme() {
    this.store.dispatch(changeTheme());
  }

  logout() {
    this.store.dispatch(logout());
  }
}
