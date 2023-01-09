import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, Observable, tap } from 'rxjs';
import { SignalRService } from '../signalr.service';
import { setTheme } from '../state/actions/ui.actions';
import { setUsername } from '../state/actions/user.actions';
import { AppState } from '../state/models/models';
import { selectTheme } from '../state/selectors/ui.selectors';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentTheme$: Observable<string> = this.store.select(selectTheme);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private signalRService: SignalRService) {}

  changeTheme() {
    this.currentTheme$.pipe(
      first(),
      tap((theme: string) => {
        const newTheme = theme == "dark" ? "light" : "dark";
        this.store.dispatch(setTheme({theme: newTheme}))
      })
    ).subscribe();
  }

  logout() {
    this.store.dispatch(setUsername({username: ""}));
    this.signalRService.logout();
    this.router.navigate(["/"]);
  }
}
