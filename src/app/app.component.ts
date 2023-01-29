import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BuySell';

  constructor(public auth: AngularFireAuth) {}

  signInUser(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOutUser(): void {
    this.auth.signOut();
  }
}
