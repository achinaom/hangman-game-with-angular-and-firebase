import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'mdb-angular-free';
  successAlert = false;
  degel: boolean = false;
  isSignedIn: boolean = false;
  signIn: boolean = false;
  signUp: boolean = true;
  email: string = ""
  pasword: string = ""
  constructor(public fireBaseService: FirebaseService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.isSignedIn = true;
      this.degel = true;
    }
    else
      this.isSignedIn = false;
  }
  async onSignUp() {
    await this.fireBaseService.signUp(this.email, this.pasword)
    debugger
    if (this.fireBaseService.isLogIn == true)
      this.isSignedIn = true;
    this.pasword = ""
    this.email = ""
  }
  async onSignIn() {
    debugger
    await this.fireBaseService.signIn(this.email, this.pasword)
    if (this.fireBaseService.isLogIn == true)
      this.isSignedIn = true;
    this.pasword = ""
    this.email = ""
  }
  handelLogOut() {
    this.isSignedIn = false;
  }
  showSignUp() {
    this.signIn = false;
    this.signUp = true;
    this.pasword = ""
    this.email = ""
  }
  showSignIn() {
    this.signIn = true;
    this.signUp = false;
    this.pasword = ""
    this.email = ""
  }

}
