import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

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

  public testDirs() {
    this.beings.forEach(being => {
      being.l = 0;
      being.t = 0;
    });
    this.beings.forEach(being => {
      if (this.inputs.keys[being.right]) {
        being.l += being.speed;
      }
      if (this.inputs.keys[being.left]) {
        being.l += -being.speed;
      }
      if (this.inputs.keys[being.down]) {
        being.t += being.speed;
      }
      if (this.inputs.keys[being.up]) {
        being.t += -being.speed;
      }
      if (being.id === 0 && (being.t || being.l)) {
        console.log('l', being.l, 't', being.t)
      }
    });
  }
}
