import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  email_address: string = '';
  password: string = '';

  constructor(private router: Router, public fbAuth: AngularFireAuth) {}

  onSignIn(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.fbAuth
        .signInWithEmailAndPassword(this.email_address, this.password)
        .then((result: UserCredential) => {
          console.log(result);
          console.log('Login success');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  ngOnInit() {
    this.fbAuth.onAuthStateChanged((user) => {
      if (user) {
        user?.getIdToken().then((idToken) => {
          let userObj = {
            user: {
              email: user.email,
            },
            token: idToken,
            refreshToken: user.refreshToken,
          };
          localStorage.setItem('userData', JSON.stringify(userObj));
          this.router.navigate(['dashboard']);
        });
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
