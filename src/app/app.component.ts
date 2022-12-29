import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-room-website';

  ngOnInit() {
    if (!window.localStorage.getItem('theme')) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute("data-theme", "dark")
      } else {
        document.documentElement.setAttribute("data-theme", "light")
      }
    }
  }
}
