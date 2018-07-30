import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscriber } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Pig Latin Converter';

  vowels = ['a', 'e', 'i', 'o', 'u']; // declare vowels
  textinput: FormControl; // form contorl on the page
  convertedText = ''; // holds the current contverted text
  translations: string[] = [];  // holds all the converted texts

  constructor() {
    this.textinput = new FormControl([]);

    this.textinput.valueChanges.subscribe(val => {
      this.convertedText = '';
      this.convert(val);
    });
  }

  add() {
    if (!this.textinput.invalid) {
      this.translations.unshift(this.convertedText);
      this.textinput.setValue('');
      this.textinput.markAsUntouched();
      this.translations.splice(10, 1);
    }
  }

  convert(input) {
    const splitString = input.replace(/[\W_]+/g, ' ').split(' ');
    if (splitString.length > 0) {
      splitString.map(word => {
        this.translate(word);
      });
    } else {
      this.translate(input);
    }
  }

  translate(word) {
    if (word !== '') {
      if (this.vowels.indexOf(word[0].toLowerCase()) > -1) {
        this.convertedText += word + 'way ';
      } else {
        const splice = this.firstVowel(word);
        if (word.length > 1) {
          this.convertedText += word.slice(splice, word.length) + word.slice(0, splice) + 'ay ';
        } else {
          this.convertedText += word + 'ay ';
        }
      }
    }
  }

  firstVowel(value): number {
    const vallenght = Array.from(value);
    for (let i = 0; i < vallenght.length; i++) {
      if (i > 1) {
        return 2;
      }
      if (this.vowels.indexOf(value[i].toLowerCase()) > -1) {
        return i;
      }
    }
    return 0;
  }
}
