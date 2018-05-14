import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  constructor() {}

  loginUser(email: string, password: string): Promise<User> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  async setSignUpDetails(email){
    const userId: string = await firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .set({
        email: email,
        HasFilledOutDetails: 'No'
      });

  }

  signupUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( () => {
        this.setSignUpDetails(email)
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }
}


