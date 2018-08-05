import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputsService {
  public pressed = new BehaviorSubject(null);

  constructor() {
  }

  public addKeyPress(key) {
    this.pressed.next(key);
  }
}
