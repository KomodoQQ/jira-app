import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { 
  AngularFirestore,
  AngularFirestoreDocument
 } from "@angular/fire/firestore";

 import { Observable, of } from "rxjs";
 import { switchMap } from "rxjs/operators";
 import { User } from "./models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: any;
  users$: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.users$ = this.db.collection('users').valueChanges();
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
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    return userRef.set(data, { merge: true });
  }

  getById(id: any) {
    return this.db.doc<User>(`users/${id}`).valueChanges();
  }
}
