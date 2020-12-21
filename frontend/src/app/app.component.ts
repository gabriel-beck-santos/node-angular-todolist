import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  user: String = '';

  constructor(private loginService: LoginService) {
    const username = localStorage.getItem('username');
    this.user = username;
    this.loginService.userChange.subscribe((val) => {
      this.user = val;
    });
  }
}
