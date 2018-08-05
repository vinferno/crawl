import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AdjustService {

  public beings;

  constructor(public store: Store<any>) {
    this.store.select('beingsState').subscribe(beings => {
      this.beings = beings.beings;
    });
  }

  public adjust() {
    this.beings.forEach(being1 => {
      // collectCollisions
      let l = being1.l;
      let t = being1.t;
      if (!l && !t) { return; }

      // case everything is fine
      if (!being1.angle.length) {
        return;
      } else {

      }

      // case can only move left
      if (being1.angle.length && !being1.leftOnly.length) {

        being1.angle.forEach(setup => {
          if (setup.affectTop && setup.affectAngle) {
            t = this.getSmallest(setup.distance.top, t);
          }
        });
        being1.t = t;
        return;
      } else {
      }

      // case can only move top
      if (being1.angle.length && being1.leftOnly.length && !being1.topOnly.length) {
        being1.leftOnly.forEach(setup => {
          if (setup.affectLeft && setup.affectAngle) {
            l = this.getSmallest(setup.distance.left, l);
          }
        });
        being1.l = l;
        return;
      } else {
      }

      // case can not move
      if (being1.angle.length && being1.leftOnly.length && being1.topOnly.length) {
        being1.leftOnly.forEach(setup => {
          if (setup.affectLeft && setup.affectAngle) {
            l = this.getSmallest(setup.distance.left, l);
          }
          if (setup.affectTop && setup.affectAngle) {
            t = this.getSmallest(setup.distance.top, t);
          }
        });
        being1.topOnly.forEach(setup => {
          if (setup.affectLeft && setup.affectAngle) {
            l = this.getSmallest(setup.distance.left, l);
          }
          if (setup.affectTop && setup.affectAngle) {
            t = this.getSmallest(setup.distance.top, t);
          }
        });
        being1.l = l;
        being1.t = t;
        return;
      } else {
      }

      // catch error
// end of being1

    });
  }

  public getSmallest(number1, number2) {
    return Math.abs(number1) < Math.abs(number2) ? number1 : number2;
  }
}
