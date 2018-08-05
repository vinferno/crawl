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

  public test() {
    this.beings.forEach(being1 => {
      const goingRight = being1.l > 0;
      const goingLeft = being1.l < 0;
      const goingDown = being1.t > 0;
      const goingUp = being1.t < 0;
      // collectCollisions
      being1.angle = [];
      being1.leftOnly = [];
      being1.topOnly = [];
      this.beings.forEach(being2 => {
        // check if it is itself;
        if (being1.id === being2.id) {
          return;
        }
        // check if it is not moving;
        if (!goingRight && !goingLeft && !goingUp && !goingDown) {
          return;
        }


        // determine position of the beings;
        const myLeft = being1.x + being1.l;
        const myOldLeft = being1.x;
        const myRight = being1.x + being1.l + being1.width;
        const myOldRight = being1.x + being1.width;
        const myTop = being1.y + being1.t;
        const myOldTop = being1.y;
        const myBottom = being1.y + being1.t + being1.height;
        const myOldBottom = being1.y + being1.height;
        const theirRight = being2.x + being2.l + being2.width;
        const theirLeft = being2.x;
        const theirBottom = being2.y + being2.width;
        const theirTop = being2.y;
        if (!this.collisionFree(myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom)) {
          being1.angle.push(
            {
              being2,
              distance: this.getDistance(myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom)
            });
        }

        if (!this.collisionFree(myLeft, myOldTop, myRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom)) {
          being1.leftOnly.push(
            {
              being2,
              distance: this.getDistance(myLeft, myOldTop, myRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom)
            });
        }

        if (!this.collisionFree(myOldLeft, myTop, myOldRight, myBottom, theirLeft, theirTop, theirRight, theirBottom)) {
          being1.topOnly.push(
            {
              being2,
              distance: this.getDistance(myOldLeft, myTop, myOldRight, myBottom, theirLeft, theirTop, theirRight, theirBottom)
            });
        }

        if (being1.id === 0 && (being1.l || being1.t) && being2.id === 1) {
          console.log('my', myLeft, myOldTop, myRight, myOldBottom);
          console.log('their', theirLeft, theirTop, theirRight, theirBottom);
        }
        // end of being2
      });
      if (being1.id === 0 && (being1.l || being1.t)) {
        console.log('being1', {...being1});
      }
// end of being1
    });
  }

  public collisionFree(myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom) {
    const xOverlap = ((myLeft >= theirLeft && myLeft <= theirRight) || (myRight <= theirRight && myRight >= theirLeft));
    const yOverlap = ((myTop >= theirTop && myTop <= theirBottom) || (myBottom <= theirBottom && myBottom >= theirTop));
    return !(xOverlap && yOverlap);
  }

  public getDistance(myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom) {
    return {
      left: (theirRight - myLeft) + 1,
      right: (theirLeft - myRight) - 1,
      top: (theirBottom - myTop) + 1,
      bottom: (theirTop - myBottom) - 1,
    };
  }

  public adjust() {
    this.beings.forEach(being1 => {
      const goingRight = being1.l > 0;
      const goingLeft = being1.l < 0;
      const goingDown = being1.t > 0;
      const goingUp = being1.t < 0;
      // collectCollisions
      let l = being1.l;
      let t = being1.t;
      if (!l && !t) { return; }

      if (being1.id === 0) {
        console.log('being1.l before adjust', being1.l, 'being1.t', being1.t);
      }

      // case everything is fine
      if (!being1.angle.length) {
        if (being1.id === 0) {
          console.log('moved fine');
        }
        return;
      } else {
        if (being1.id === 0) {
          console.log('angle was not free');
        }
      }

      // case can only move left
      if (being1.angle.length && !being1.leftOnly.length) {
        if (being1.id === 0) {
          console.log('moved left only');
        }

        being1.angle.forEach(setup => {
          if (being1.id === 0) {
            console.log('----angle setup', setup);
          }
          if (setup.affectTop && setup.affectAngle) {
            t = this.getSmallest(setup.distance.top, t);
            if (being1.id === 0) {
              console.log('----top was tried to change', this.getSmallest(setup.distance.top, t), setup.distance.top, t);

            }
          }
        });
        being1.t = t;
        console.log('being1.l --after', being1.l, 'being1.t -- after', being1.t);
        return;
      } else {
        if (being1.id === 0) {
          console.log('left only was not free');
        }
      }

      // case can only move top
      if (being1.angle.length && being1.leftOnly.length && !being1.topOnly.length) {
        if (being1.id === 0) {
          console.log('moved top only -- activated');
        }
        being1.leftOnly.forEach(setup => {
          if (being1.id === 0) {
            console.log('----leftOnly each', setup);
          }
          if (setup.affectLeft && setup.affectAngle) {
            l = this.getSmallest(setup.distance.left, l);
            if (being1.id === 0) {
              console.log('----left was tried to change', this.getSmallest(setup.distance.left, l), setup.distance.left, l);
            }
          }
        });
        being1.l = l;
        if (being1.id === 0) {
          console.log('being1.l --after', being1.l, 'being1.t -- after', being1.t);
        }
        return;
      } else {
        if (being1.id === 0) {
          console.log('top only was not free');
        }
      }

      // case can not move
      if (being1.angle.length && being1.leftOnly.length && being1.topOnly.length) {
        if (being1.id === 0) {
          console.log('can not move activated');
        }
        being1.leftOnly.forEach(setup => {
          if (being1.id === 0) {
            console.log('----left only setup', setup);
          }
          if (setup.affectLeft && setup.affectAngle) {
            l = this.getSmallest(setup.distance.left, l);
            if (being1.id === 0) {
              console.log('----left was tried to change', this.getSmallest(setup.distance.left, l), setup.distance.left, l);
            }
          }
          if (setup.affectTop && setup.affectAngle) {
            t = this.getSmallest(setup.distance.top, t);
            if (being1.id === 0) {
              console.log('----top was tried to change', this.getSmallest(setup.distance.top, t), setup.distance.top, t);
            }
          }
        });
        being1.topOnly.forEach(setup => {
          if (being1.id === 0) {
            console.log('----top only setup', setup);
          }
          if (setup.affectLeft && setup.affectAngle) {
            l = this.getSmallest(setup.distance.left, l);
            if (being1.id === 0) {
              console.log('----left was tried to change', this.getSmallest(setup.distance.left, l), setup.distance.left, l);
            }
          }
          if (setup.affectTop && setup.affectAngle) {
            t = this.getSmallest(setup.distance.top, t);
            if (being1.id === 0) {
              console.log('----top was tried to change', this.getSmallest(setup.distance.top, t), setup.distance.top, t);
            }
          }
        });
        being1.l = l;
        being1.t = t;
        console.log('being1.l --after', being1.l, 'being1.t -- after', being1.t);
        return;
      } else {
        if (being1.id === 0) {
          console.log('no collision was not free');
        }
      }

      // catch error
      if (being1.id === 0) {
        console.log('never completed');
      }
// end of being1

    });
  }

  public getSmallest(number1, number2) {
    console.log('get smallest was activated', number1, number2)
    return Math.abs(number1) < Math.abs(number2) ? number1 : number2;
  }
}
