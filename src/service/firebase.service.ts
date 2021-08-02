import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLogIn = false
  constructor(public firebaseAuth: AngularFireAuth) { }

  async signIn(email: string, password: string) {
    debugger
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLogIn = true;
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }

  async signUp(email: string, password: string) {
    debugger
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        debugger
        this.isLogIn = true;
        localStorage.setItem('user', JSON.stringify(res.user))
      })
  }

  logOut() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
}
