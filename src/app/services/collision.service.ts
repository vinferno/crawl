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
        const theirLeft = being2.x + being2.l;
        const theirBottom = being2.y + being2.width + being2.t;
        const theirTop = being2.y + being2.t;
        const theirOldRight = being2.x + being2.width;
        const theirOldLeft = being2.x;
        const theirOldBottom = being2.y + being2.width;
        const theirOldTop = being2.y;

        // test angle
        if (!this.collisionFree(myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom)) {
          const collision = {
            being2: {...being2},
            distance:
              this.getDistance(
                myOldLeft, myOldTop, myOldRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom,
                being1.l, being1.t, theirOldLeft, theirOldTop, theirOldRight, theirOldBottom
              ),
            affectLeft: !this.collisionFree(
              myLeft, myOldTop, myRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom),
            affectTop: !this.collisionFree(
              myOldLeft, myTop, myOldRight, myBottom, theirLeft, theirTop, theirRight, theirBottom),
            affectAngle: !this.collisionFree(
              myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom),
            id: being2.id
          };
          being1.angle.push(collision);
          if (being1.id === 0) {
            console.log('angle collision detected', collision.id);
          }
        }

        // test left only
        if (!this.collisionFree(myLeft, myOldTop, myRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom)) {
          console.log('left only');
          const collision = {
            being2: {...being2},
            distance:
              this.getDistance(
                myOldLeft, myOldTop, myOldRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom,
                being1.l, being1.t, theirOldLeft, theirOldTop, theirOldRight, theirOldBottom
              ),
            affectLeft: !this.collisionFree(
              myLeft, myOldTop, myRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom),
            affectTop: !this.collisionFree(
              myOldLeft, myTop, myOldRight, myBottom, theirLeft, theirTop, theirRight, theirBottom),
            affectAngle: !this.collisionFree(
              myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom),
            id: being2.id
          };
          being1.leftOnly.push(collision);
          if (being1.id === 0) {
            console.log('left only collision detected', collision.id);
          }
        }

        // test top only
        if (!this.collisionFree(myOldLeft, myTop, myOldRight, myBottom, theirLeft, theirTop, theirRight, theirBottom)) {
          const collision = {
            being2: {...being2},
            distance:
              this.getDistance(
                myOldLeft, myOldTop, myOldRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom, being1.l, being1.t,
                theirOldLeft, theirOldTop, theirOldRight, theirOldBottom
              ),
            affectLeft: !this.collisionFree(
              myLeft, myOldTop, myRight, myOldBottom, theirLeft, theirTop, theirRight, theirBottom),
            affectTop: !this.collisionFree(
              myOldLeft, myTop, myOldRight, myBottom, theirLeft, theirTop, theirRight, theirBottom),
            affectAngle: !this.collisionFree(
              myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom),
            id: being2.id
          };
          being1.topOnly.push(collision);
          if (being1.id === 0) {
            console.log('top only collision detected', collision.id);
          }
        }
        // end of being2
      });
// end of being1
    });
  }

  public collisionFree(myLeft, myTop, myRight, myBottom, theirLeft, theirTop, theirRight, theirBottom) {
    const xOverlap = ((myLeft >= theirLeft && myLeft <= theirRight) || (myRight <= theirRight && myRight >= theirLeft));
    const yOverlap = ((myTop >= theirTop && myTop <= theirBottom) || (myBottom <= theirBottom && myBottom >= theirTop));
    return !(xOverlap && yOverlap);
  }

  public getDistance(
    myLeft,
    myTop,
    myRight,
    myBottom,
    theirLeft,
    theirTop,
    theirRight,
    theirBottom,
    l,
    t,
    theirOldLeft,
    theirOldTop,
    theirOldRight,
    theirOldBottom,
  ) {

    const goingLeft = l < 0;
    const goingRight = l > 0;
    const goingUp = t < 0;
    const goingDown = t > 0;
    let tl = goingLeft ? (theirRight - myLeft) + 1 : (theirLeft - myRight) - 1;
    let tt = goingUp ? (theirBottom - myTop) + 1 : (theirTop - myBottom) - 1;
    tl = l === 0 ? 0 : tl;
    tt = t === 0 ? 0 : tt;

    if (goingLeft && tl > 0 ) {
      tl = Math.floor(  (myLeft - theirOldRight ) / 2 ) * - 1;
    }
    if (goingRight && tl < 0) {
      tl = Math.floor(  (theirOldLeft - myRight ) / 2 );
    }

    if (goingUp && tt > 0 ) {
      tt = Math.floor(  (myTop - theirOldBottom ) / 2 ) * - 1;
    }
    if (goingDown && tt < 0) {
      tt = Math.floor(  (myTop - theirOldBottom ) / 2 );
    }

    return {
      left: tl,
      top: tt,
    };
  }

  public sameSign(a, b) {
    return ( a ^ b) >= 0;
  }
}
