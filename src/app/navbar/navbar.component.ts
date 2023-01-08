import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable, tap } from 'rxjs';
import { setTheme } from '../state/actions/ui.actions';
import { AppState } from '../state/models/models';
import { selectTheme } from '../state/selectors/ui.selectors';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentTheme$: Observable<string> = this.store.select(selectTheme);

  constructor(private store: Store<AppState>) {}

  changeTheme() {
    this.currentTheme$.pipe(
      first(),
      tap((theme: string) => {
        const newTheme = theme == "dark" ? "light" : "dark";
        this.store.dispatch(setTheme({theme: newTheme}))
      })
    ).subscribe();
  }
}
