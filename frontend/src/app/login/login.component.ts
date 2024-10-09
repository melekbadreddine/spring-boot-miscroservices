import { Component } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //injection de dependences
  constructor(private auth: AuthService, private router: Router) {}
  signIn(): void {
    this.auth.doGoogleLogin().then(() => {
      this.router.navigate(['/member']);
    });
  }
}
