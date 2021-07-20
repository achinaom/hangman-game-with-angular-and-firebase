import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mdb-angular-free';

  successAlert = false;

  copyToClipboard(value: string): void {
    const tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    this.successAlert = true;

    setTimeout(() => {
      this.successAlert = false;
    }, 900);
  }

  degel: boolean = false;
  isSignedIn: boolean = false;

  constructor(public fireBaseServse: FirebaseService) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.isSignedIn = true;
      this.degel = true;
    }
    else
      this.isSignedIn = false;

  }
  async onSignup() {
    debugger
    await this.fireBaseServse.signUp(this.emailSignUp, this.paswordSignUp)
    debugger
    if (this.fireBaseServse.isLogIn == true)
      this.isSignedIn = true;
  }
  async onSignin() {
    debugger
    await this.fireBaseServse.signIn(this.email, this.pasword)
    if (this.fireBaseServse.isLogIn == true)
      this.isSignedIn = true;
  }
  handelLogOut() {
    this.isSignedIn = false;
  }
  change_sign_up() {
    this.signInDegel = false;
    this.signUpDegel = true;
  }
  change_sign_in() {
    this.signInDegel = true;
    this.signUpDegel = false;
  }
  signInDegel: boolean = false;
  signUpDegel: boolean = true;
  emailSignUp: string = ""
  paswordSignUp: string = ""
  email: string = ""
  pasword: string = ""
}
