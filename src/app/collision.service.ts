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
  }

  public testAgain() {
    this.beings.forEach(being1 => {
      being1.preventLeft = [];
      being1.preventTop = [];
      being1.preventLeftOld = [];
      being1.preventTopOld = [];
      // checkDirection it is moving;
      const being1Right = being1.l > 0;
      const being1Left = being1.l < 0;
      const being1Down = being1.t > 0;
      const being1Up = being1.t < 0;
      this.beings.forEach(being2 => {
        // check if it is itself;
        if (being1.id === being2.id) {
          return;
        }

        // check if it is not moving;
        if (!being1Right && !being1Left && !being1Up && !being1Down) {
          // return;
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
        const theirBottom = being2.y + being2.t + being2.width;
        const theirTop = being2.y + being2.t;

        const xOverlap = (myLeft >= theirLeft && myLeft <= theirRight || myRight <= theirRight && myRight >= theirLeft);
        const yOverlap = (myTop >= theirTop && myTop <= theirBottom || myBottom <= theirBottom && myBottom >= theirTop);
        const xOverlapOld = (myOldLeft >= theirLeft && myOldLeft <= theirRight || myOldRight <= theirRight && myOldRight >= theirLeft);
        const yOverlapOld = (myOldTop >= theirTop && myOldTop <= theirBottom || myOldBottom <= theirBottom && myOldBottom >= theirTop);

        const angleOpen = !xOverlap && !yOverlap;
        const leftOnly = !xOverlap && yOverlap && !yOverlapOld;
        const topOnly = !yOverlap && xOverlap && !xOverlapOld;
        const noWay = xOverlap && yOverlap;

        if (being1Right || being1Left) {
          if (yOverlap && xOverlap) {
            if (being1Right && theirRight > myRight || being1Left && theirLeft < myLeft) {
              being1.preventLeft.push(being2);
            }
          }
        }

        if (being1Up || being1Down) {
          if (yOverlap && xOverlap) {
            if (being1Down && theirBottom > myBottom || being1Up && theirTop < myTop) {
              being1.preventTop.push(being2);
            }
          }
        }

        if (being1Up || being1Down) {
          if (yOverlap && xOverlapOld) {
            if (being1Down && theirBottom > myBottom || being1Up && theirTop < myTop) {
              being1.preventTopOld.push(being2);
            }
          }
        }

        if (being1Right || being1Left) {
          if (yOverlapOld && xOverlap) {
            if (being1Right && theirRight > myRight || being1Left && theirLeft < myLeft) {
              being1.preventLeftOld.push(being2);
            }
          }
        }
      });


      // assign
      if (being1.preventLeft.length && being1.preventLeftOld.length) {
        let smallMove = being1.l;
        being1.preventLeft.forEach(being2 => {
          if (being1Right) {
            smallMove = being2.x - (being1.x + being1.width) - 1;
          }
          if (being1Left) {
            smallMove = (being2.x + being2.width) - (being1.x) + 1;
          }
        });
        being1.preventLeftOld.forEach(being2 => {
          if (being1Right) {
            smallMove = being2.x - (being1.x + being1.width) - 1;
          }
          if (being1Left) {
            smallMove = (being2.x + being2.width) - (being1.x) + 1;
          }
        });
        if (being1.id === 4) {
          console.log('being1', being1);
          console.log('preventTop', being1.preventTop);
          console.log('preventTopOld', being1.preventTopOld);
        }
        being1.l = Math.abs(smallMove) <= being1.l ? smallMove : 0;
      }
      if (being1.preventTop.length && being1.preventTopOld.length) {
        let smallMove = being1.t;
        being1.preventTop.forEach(being2 => {
          if (being1Down) {
            smallMove = being2.y - (being1.y + being1.height) - 1;
          }
          if (being1Up) {
            smallMove = (being2.y + being2.height) - (being1.y) + 1;
          }
        });
        being1.preventTopOld.forEach(being2 => {
          if (being1Down) {
            smallMove = being2.y - (being1.y + being1.height) - 1;
          }
          if (being1Up) {
            smallMove = (being2.y + being2.height) - (being1.y) + 1;
          }
        });
        if (being1.id === 4) {
          console.log('being1', being1);
          console.log('preventTop', being1.preventTop);
          console.log('preventTopOld', being1.preventTopOld);
        }
        being1.t = Math.abs(smallMove) <= being1.t ? smallMove : 0;
      }
    });
  }
}
