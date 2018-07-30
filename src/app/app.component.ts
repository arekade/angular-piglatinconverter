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

    // watch for value changes
    this.textinput.valueChanges.subscribe(val => {
      this.convertedText = '';
      this.convert(val);
    });
  }

  // Add to array
  add() {
    if (!this.textinput.invalid) {
      // add to top of array
      this.translations.unshift(this.convertedText);
      this.textinput.setValue('');
      this.textinput.markAsUntouched();
      this.translations.splice(10, 1); // remove items past position 10
    }
  }

  // Convert words
  convert(input) {
    // remove not ASCII charaters and split sentence
    const splitString = input.replace(/[\W_]+/g, ' ').split(' ');
    if (splitString.length > 0) {
      splitString.map(word => {
        this.translate(word);
      });
    } else {
      // no sentence found translate word.
      this.translate(input);
    }
  }

  // Translate each word according to Pig Latin rules
  translate(word) {
    // Makes sure words not empty
    if (word !== '') {
      // Check if first letter us a vowel
      if (this.vowels.indexOf(word[0].toLowerCase()) > -1) {
        this.convertedText += word + 'way ';
      } else { // first letter is not a vowel
        const splice = this.firstVowel(word); // Check for multiple consonants
        // check for word length > 1
        if (word.length > 1) {
          this.convertedText += word.slice(splice, word.length) + word.slice(0, splice) + 'ay ';
        } else {
          this.convertedText += word + 'ay ';
        }
      }
    }
  }

  // Find position of first vowel and if greater than 2 then return 2 else return position
  // this is used for the multple consonant rule
  firstVowel(value): number {
    const vallenght = Array.from(value);
    for (let i = 0; i < vallenght.length; i++) {
      if (i > 1) {
        return 2; // Return as not interested in positions > than 2.
      }
      if (this.vowels.indexOf(value[i].toLowerCase()) > -1) {
        return i;
      }
    }
    return 0;
  }
}
