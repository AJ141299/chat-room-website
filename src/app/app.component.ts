import { Component } from '@angular/core';

const setThemeFromOS = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute("data-theme", "dark")
  } else {
    document.documentElement.setAttribute("data-theme", "light")
  }
}

const setThemeFromStorage = (localTheme: string) => {
  document.documentElement.setAttribute("data-theme", localTheme);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-room-website';

  ngOnInit() {
    const localTheme: string | null = window.localStorage.getItem('theme')
    localTheme ? setThemeFromStorage(localTheme) : setThemeFromOS();
  }
}
