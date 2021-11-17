import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  idToken: string;
  refreshToken: string;
  constructor(
    private router: Router,
    private fbAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!!localStorage.getItem('userData')) {
      const info = JSON.parse(<string>localStorage.getItem('userData'));
      this.idToken = info['token'];
      this.refreshToken = info['refreshToken'];
    }
  }

  onLogout(): void {
    this.fbAuth
      .signOut()
      .then(() => {
        localStorage.setItem('userData', '');
        this.authService.setLogginSatuts(false);
        console.log('Logout success');
      })
      .catch((error) => console.log(error));
    this.router.navigate(['signin']);
  }
}
