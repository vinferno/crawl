import {Component, HostListener} from '@angular/core';
import {InputsService} from './inputs.service';

@Component({
  selector: 'vf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardPress(event: KeyboardEvent) {
    this.addKeyPress(event);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUp(event: KeyboardEvent) {
    this.addKeyPress(event);
  }


  constructor(public input: InputsService) {
  }

  public addKeyPress(key) {
    this.input.addKeyPress(key);
  }
}
