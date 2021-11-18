import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import User = firebase.User;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  idToken: string;
  refreshToken?: string;
  constructor(private router: Router, private fbAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.fbAuth.user.subscribe((user: User | null) => {
      user
        ?.getIdToken()
        .then((token: string) => {
          this.idToken = token;
          this.refreshToken = user?.refreshToken || '';
        })
        .catch(error => {
          console.log(error)
          this.idToken = '';
        });
    });
  }

  onLogout(): void {
    this.fbAuth
      .signOut()
      .then(() => {
        localStorage.setItem('userData', '');
        console.log('Logout success');
      })
      .catch((error) => console.log(error));
    this.router.navigate(['signin']);
  }
}
