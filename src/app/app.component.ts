import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAsRRdOVZMi7UqhaTYzQSXoY8q-s9S9Zes",
      authDomain: "bookshelves-31712.firebaseapp.com",
      databaseURL: "https://bookshelves-31712.firebaseio.com",
      projectId: "bookshelves-31712",
      storageBucket: "bookshelves-31712.appspot.com",
      messagingSenderId: "486629361358",
      appId: "1:486629361358:web:32a5d7beb8250f4a5ab29f",
      measurementId: "G-JK2VDNGGSD"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
