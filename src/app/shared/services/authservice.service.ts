import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private auth:AngularFireAuth) { }

  login(email:string, pass:string){
    return this.auth.signInWithEmailAndPassword(email, pass);
  }
  signup(email:string, pass:string){
    return this.auth.createUserWithEmailAndPassword(email, pass)
  }
  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }
}
