import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userData: any;
  constructor(private angularFireAuth: AngularFireAuth) { 
    this.userData = angularFireAuth.authState;
  }
  signIn(email:string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in!');
    })
    .catch(err => {
      console.log('Something is wrong: ', err.message);
    })
  }

  signOut() {
    this.angularFireAuth.signOut();
  }
}
