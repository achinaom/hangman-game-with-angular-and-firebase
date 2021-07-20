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
  @ViewChild('basicModal', { static: true }) basicModal: ModalDirective;
  @ViewChild('demoBasic', { static: true }) demoBasic: ModalDirective;
  @Output() isLogout = new EventEmitter<void>()
  arrImg: string[] = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
  
  imageStatus: string = "";
  random_word: string = "";
  index: number = 0;
  temp: any;
  finish: string = ""
  keyBoard: string[] =
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
      'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
      'q', 'r', 's', 't', 'u', 'v', 'w', 's', 'y', 'z'];
  Array_for_use_char: string[] = []
  temp_word: string = ""
  massege_word: string = ""
  degel = false;
  users: any[]
  constructor(public fireBserService: FirebaseService, private random_wird_service: RandomWordService) {
    this.imageStatus = this.arrImg[this.index];
    this.random_word_func();
  }

  ngOnInit(): void {
  }


  random_word_func() {
    this.random_wird_service.getWord().subscribe(
      data => { this.random_word = String(data.word), this.complet_word(), console.log(data.word) },
      err => console.log(err)
    )
  }

  counter() {
    return new Array(this.random_word.length)
  }
  arr_word: string[] = [];
  count = 0;
  complet_word() {
    this.arr_word = []
    for (let index = 0; index < this.random_word.length; index++) {
      this.arr_word.push("_")
    }
  }


  check_char(char: string) {
    if (this.Array_for_use_char.indexOf(char) != -1)
      this.massege_word = "This letter was selected"
    else if (this.random_word.indexOf(char) == -1) {
      this.Array_for_use_char.push(char);
      this.imageStatus = this.arrImg[++this.index];
      this.massege_word = ""
    }
    else {
      this.massege_word = ""
      this.Array_for_use_char.push(char);
      this.temp_word = this.random_word;
      while (this.random_word.indexOf(char) != -1) {
        this.count++;
        this.arr_word[this.random_word.indexOf(char)] = char
        this.temp = this.random_word.split("");
        this.temp[this.random_word.indexOf(char)] = " "
        this.random_word = this.temp.join('');
        this.grade += 1;
      }
    }
    if (this.count == this.random_word.length)
      this.basicModal.show();
    if (this.index == 6)
      this.demoBasic.show()
  }
  grade: number = 0
  logout() {
    this.fireBserService.logOut();
    this.isLogout.emit()
  }
  next_level() {
    this.level++;
    this.count = 0
    this.Array_for_use_char = [];
    this.index = 0;
    this.imageStatus = this.arrImg[this.index];
    this.random_word_func()
    this.basicModal.hide();
    this.demoBasic.hide()
  }
level:number=0;
  new_game() {
    this.level=0;
    this.count = 0
    this.Array_for_use_char = [];
    this.index = 0;
    this.grade = 0
    this.imageStatus = this.arrImg[this.index];
    this.random_word_func()
    this.basicModal.hide();
    this.demoBasic.hide()


  }

}