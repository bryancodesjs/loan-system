import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userData: any;
  invalidLogin: boolean = false;

  constructor(private angularFireAuth: AngularFireAuth) { 
    this.userData = angularFireAuth.authState;
  }
  signIn(email:string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in!');
      this.invalidLogin = false;
    })
    .catch(err => {
      console.log('Something is wrong: ', err.message);
      this.invalidLogin = true;
    })
  }

  signOut() {
    this.angularFireAuth.signOut();
  }
}
