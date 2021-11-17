import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
 isAuth = false;
  isLoggedIn(): boolean {
    return this.isAuth;
  }
  setLogginSatuts(val: boolean){
    this.isAuth = val;
  }

}
