import { Component } from "@angular/core";
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { AgeValidator } from '../../validators/age';

import firebase from 'firebase';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  public detailsForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
  ) {
    this.detailsForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      ContactNo: [''],
      ID: ['']
      // age: ['', AgeValidator.isValid]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  async updateDetails(){
    const userId: string = await firebase.auth().currentUser.uid;
    console.log(userId + ' userid');
    const firstName: string = this.detailsForm.value.firstName;
    const lastName: string = this.detailsForm.value.lastName;
    const ContactNo: string = this.detailsForm.value.ContactNo;
    const ID: string = this.detailsForm.value.ID;
    console.log('Working up to here');
    firebase
      .database()
      .ref(`/userProfile/${userId}`)
      .set({
        firstName: firstName,
        lastName: lastName,
        ContactNo: ContactNo,
        ID: ID,
        'HasFilledOutDetails': 'Yes'
      });
  }

}

