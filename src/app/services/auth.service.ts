import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { 
  AngularFirestore,
  AngularFirestoreDocument
 } from "@angular/fire/firestore";

 import { merge, Observable, observable, of } from "rxjs";
 import { switchMap } from "rxjs/operators";
 import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: any;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  
  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential: any = await this.afAuth.signInWithPopup(provider);
    this.updateUserData(credential.user);    
    return this.router.navigate(['']);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/login']);
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    return userRef.set(data, { merge: true });
  }
}
