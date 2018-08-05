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
      if (being.id === 0 && (being.l || being.t)) {
        console.log('before', being.x, being.y);
      }
      being.x += being.l;
      being.y += being.t;
      if (being.id === 0 && (being.l || being.t)) {
        console.log('moved', being.x, being.y);
        console.log('being', {...being});
      }
    });
  }
}
