import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { FirebaseService } from 'src/service/firebase.service';
import { EventEmitter } from '@angular/core';
import { RandomWordService } from 'src/service/random-word.service';
@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {
  @ViewChild('Modal1', { static: true }) Modal1: ModalDirective;
  @ViewChild('Modal2', { static: true }) Modal2: ModalDirective;
  @Output() isLogout = new EventEmitter<void>()
  arrayImg: string[] = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
  keyBoard: string[] =
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
      'q', 'r', 's', 't', 'u', 'v', 'w', 's', 'y', 'z'];
  image: string = "";
  randomWord: string = "";
  index: number = 0;
  temp: any;
  selectedLettersArray: string[] = []
  tempWord: string = ""
  massege: string = ""
  arrayWord: string[] = [];
  count = 0;
  grade: number = 0
  level: number = 1;


  constructor(public fireBaseService: FirebaseService, private random_word_service: RandomWordService) {
    this.image = this.arrayImg[this.index];
    this.randomWordFunc();
  }

  ngOnInit(): void {
  }

  randomWordFunc() {
    this.random_word_service.getWord().subscribe(
      data => { this.randomWord = String(data.word), this.completWord(), console.log(data.word) },
      err => console.log(err)
    )
  }

  counter() {
    return new Array(this.randomWord.length)
  }

  completWord() {
    this.arrayWord = []
    for (let index = 0; index < this.randomWord.length; index++) {
      this.arrayWord.push("_")
    }
  }

  CheckLetter(char: string) {
    if (this.count == this.randomWord.length)
      this.Modal1.show();
    else if (this.index == 6)
      this.Modal2.show()
    else {
      if (this.selectedLettersArray.indexOf(char) != -1)
        this.massege = "This letter was selected"
      else if (this.randomWord.indexOf(char) == -1) {
        this.selectedLettersArray.push(char);
        this.image = this.arrayImg[++this.index];
        this.massege = ""
      }
      else {
        this.massege = ""
        this.selectedLettersArray.push(char);
        this.tempWord = this.randomWord;
        while (this.randomWord.indexOf(char) != -1) {
          this.count++;
          this.arrayWord[this.randomWord.indexOf(char)] = char
          this.temp = this.randomWord.split("");
          this.temp[this.randomWord.indexOf(char)] = " "
          this.randomWord = this.temp.join('');
          this.grade += 1;
        }
      }
      if (this.count == this.randomWord.length)
        this.Modal1.show();
      if (this.index == 6)
        this.Modal2.show()
    }
  }

  logOut() {
    this.fireBaseService.logOut();
    this.isLogout.emit()
  }

  nextLevel() {
    this.level++;
    this.count = 0
    this.selectedLettersArray = [];
    this.index = 0;
    this.image = this.arrayWord[this.index];
    this.randomWordFunc()
    this.Modal1.hide();
    this.Modal2.hide()
  }

  newGame() {
    this.level = 1;
    this.count = 0
    this.selectedLettersArray = [];
    this.index = 0;
    this.grade = 0
    this.image = this.arrayImg[this.index];
    this.randomWordFunc()
    this.Modal1.hide();
    this.Modal2.hide()
  }

}