
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { HangmanComponent } from './hangman/hangman.component';
import { FirebaseService } from 'src/service/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    HangmanComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAGjts-GbSgMEqpA5VJlbf4K3h24oCTgvo",
      authDomain: "fir-hamgman-gmae.firebaseapp.com",
      projectId: "fir-hamgman-gmae",
      storageBucket: "fir-hamgman-gmae.appspot.com",
      messagingSenderId: "690523645509",
      appId: "1:690523645509:web:0a3ad73b88eddc3825e52c"
    }),
    AngularFireDatabaseModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
