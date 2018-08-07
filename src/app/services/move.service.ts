import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  public beings;
  public inputs;

  constructor(public store: Store<any>) {
    this.store.select('beingsState').subscribe(beings => {
      this.beings = beings.beings;
    });
    this.store.select('inputsState').subscribe(inputs => {
      this.inputs = inputs;
    });
  }

  public move() {
    this.beings.forEach(being => {
      being.x += being.l;
      being.y += being.t;
      being.lastL = being.l ? being.l : being.lastL;
      being.lastT = being.t ? being.t : being.lastT;
    });
  }
}
