import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {LiveComponent} from '../live-view/live.component';
import {NavigationComponent} from '../navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'VGI';

  ngOnInit(): void {
    // Set the initial theme based on user preference or default to light
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.add(prefersDark ? 'dark' : 'light');
    document.body.classList.remove('init');
  }

  public changeTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  }
}
