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
        const theirOldRight = being2.x + being2.width;
        const theirLeft = being2.x;
        const theirOldLeft = being2.x;
        const theirBottom = being2.y + being2.width;
        const theirOldBottom = being2.y + being2.width;
        const theirTop = being2.y;
        const theirOldTop = being2.y;

        const xOverlap = ((myLeft >= theirLeft && myLeft <= theirRight) || (myRight <= theirRight && myRight >= theirLeft));
        const yOverlap = ((myTop >= theirTop && myTop <= theirBottom) || (myBottom <= theirBottom && myBottom >= theirTop));
        const xOverlapOld = ((myOldLeft >= theirLeft && myOldLeft <= theirRight) || (myOldRight <= theirRight && myOldRight >= theirLeft));
        const yOverlapOld = ((myOldTop >= theirTop && myOldTop <= theirBottom) || (myOldBottom <= theirBottom && myOldBottom >= theirTop));

        const xOverlapTheirs = ((myLeft >= theirOldLeft && myLeft <= theirOldRight) || (myRight <= theirOldRight && myRight >= theirOldLeft));
        const yOverlapTheirs = ((myTop >= theirOldTop && myTop <= theirOldBottom) || (myBottom <= theirOldBottom && myBottom >= theirOldTop));
        const xOverlapOldTheirs = ((myOldLeft >= theirOldLeft && myOldLeft <= theirOldRight) || (myOldRight <= theirOldRight && myOldRight >= theirOldLeft));
        const yOverlapOldTheirs = ((myOldTop >= theirOldTop && myOldTop <= theirOldBottom) || (myOldBottom <= theirOldBottom && myOldBottom >= theirOldTop));

        if (being1Right || being1Left) {
          if (yOverlap && xOverlap) {
            if ((being1Right && theirRight > myRight) || (being1Left && theirLeft < myLeft)) {
              being1.preventLeft.push(being2);
            }
          }
        }

        if (being1Up || being1Down) {
          if (yOverlap && xOverlap) {
            if ((being1Down && theirBottom > myBottom) || (being1Up && theirTop < myTop)) {
              being1.preventTop.push(being2);
            }
          }
        }

        if (being1Up || being1Down) {
          if (yOverlap && xOverlapOld) {
            if ((being1Down && theirBottom > myBottom) || (being1Up && theirTop < myTop)) {
              being1.preventTopOld.push(being2);
            }
          }
        }

        if (being1Right || being1Left) {
          if (yOverlapOld && xOverlap) {
            if ((being1Right && theirRight > myRight) || (being1Left && theirLeft < myLeft)) {
              being1.preventLeftOld.push(being2);
            }
          }
        }
      });


      // assign
      if (being1.preventLeft.length || being1.preventLeftOld.length) {
        let smallMove = being1.l;
        being1.preventLeft.forEach(being2 => {
          const testRight = (being2.x + being2.l) - (being1.x + being1.width) - 1;
          const testLeft = (being2.x + being2.width + being2.l) - (being1.x) + 1;
          if (being1Right && Math.abs(testRight) < Math.abs(smallMove)) {
            smallMove = testRight;
          }
          if (being1Left && Math.abs(testLeft) < Math.abs(smallMove)) {
            smallMove = testLeft;
          }
          if (being1.id === 2 && (being1.t || being1.l) ) {
            console.log('l', {...being1}, smallMove);
          }
        });
        being1.preventLeftOld.forEach(being2 => {
          const testRight = (being2.x + being2.l) - (being1.x + being1.width) - 1;
          const testLeft = (being2.x + being2.width + being2.l) - (being1.x) + 1;
          if (being1Right && Math.abs(testRight) < Math.abs(smallMove)) {
            smallMove = testRight;
          }
          if (being1Left && Math.abs(testLeft) < Math.abs(smallMove)) {
            smallMove = testLeft;
          }
          if (being1.id === 2 && (being1.t || being1.l) ) {
            console.log('l', {...being1}, smallMove);
          }
        });

        being1.l = Math.abs(smallMove) <= Math.abs(being1.l) ? smallMove : 0;
        if (being1.id === 2 && (being1.t || being1.l) ) {
          console.log('l2', {...being1});
        }
      }
      if (being1.preventTop.length || being1.preventTopOld.length) {
        let smallMove = being1.t;
        being1.preventTop.forEach(being2 => {
          const testDown = (being2.y + being2.t) - (being1.y + being1.height) - 1;
          const testUp = (being2.y + being2.height + being2.t) - (being1.y) + 1;
          if (being1Down && Math.abs(testDown) < Math.abs(smallMove)) {
            smallMove = testDown;
          }
          if (being1Up && Math.abs(testUp) < Math.abs(smallMove)) {
            smallMove = testUp;
          }
          if (being1.id === 2 && (being1.t || being1.l) ) {
            console.log('t', {...being1}, smallMove);
          }
        });
        being1.preventTopOld.forEach(being2 => {
          const testDown = (being2.y + being2.t) - (being1.y + being1.height) - 1;
          const testUp = (being2.y + being2.height + being2.t) - (being1.y) + 1;
          if (being1Down && Math.abs(testDown) < Math.abs(smallMove)) {
            smallMove = testDown;
          }
          if (being1Up && Math.abs(testUp) < Math.abs(smallMove)) {
            smallMove = testUp;
          }
          if (being1.id === 2 && (being1.t || being1.l) ) {
            console.log('t', {...being1}, smallMove);
          }
        });
        being1.t = Math.abs(smallMove) <= Math.abs(being1.t) ? smallMove : 0;
        if (being1.id === 2 && (being1.t || being1.l) ) {
          console.log('t2', {...being1}, smallMove);
        }
      }

      if (being1.id === 2 && (being1.t || being1.l) ) {
        console.log('test', {...being1});
      }

    });
  }
}
