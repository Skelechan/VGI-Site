import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'VGI';

  public changeTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  }
}
