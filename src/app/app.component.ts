import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import firebase from 'firebase';
import { Unsubscribe } from '@firebase/util';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DetailsPage } from '../pages/details/details';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyCsO9pcpUt1b-TmMMr2mRZrU-30fGocNcI",
      authDomain: "tester-f1264.firebaseapp.com",
      databaseURL: "https://tester-f1264.firebaseio.com",
      projectId: "tester-f1264",
      storageBucket: "tester-f1264.appspot.com",
      messagingSenderId: "1086749179711"
    });

    const unsubscribe: Unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        if (!user) {
          this.rootPage = 'LoginPage';
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
