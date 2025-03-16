import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  public changeTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  }
}
