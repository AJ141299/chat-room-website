import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  changeTheme() {
    document.querySelector('body')?.classList.add('bg-color-transition');
    const currentTheme: string | null = window.localStorage.getItem('theme')
      ?? document.documentElement.getAttribute("data-theme");
    
    if (currentTheme == 'dark') {
      document.documentElement.setAttribute("data-theme", "light");
      window.localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      window.localStorage.setItem('theme', 'dark')
    }
  }
}
