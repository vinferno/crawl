import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  public beings;

  constructor(public store: Store<any>) {
    this.store.select('beingsState').subscribe(beings => {
      this.beings = beings.beings;
    });
  }

  public test() {
    this.testAgain();
    this.testAgain();
    this.testAgain();
    this.testAgain();
  }

  public testAgain() {
    this.beings.forEach(being1 => {
      const goingRight = being1.l > 0;
      const goingLeft = being1.l < 0;
      const goingDown = being1.t > 0;
      const goingUp = being1.t < 0;
      // collectCollisions
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
      });
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
}
