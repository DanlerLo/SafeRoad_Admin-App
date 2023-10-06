import { Component } from '@angular/core';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'saferoad_admin';
  userLoggedIn : boolean = true;
  constructor(
    private authApi : AuthService
  ) {}

  ngOnInit() {
    this.userLoggedIn = this.authApi.isUserLoggedIn();
  }
}
