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
    let allDone = true;
    this.beings.forEach(being1 => {
      if (being1.done) {
        return;
      }
      this.beings.forEach(being2 => {
        if (being1.id === being2.id) {
          return;
        }
        const being1Right = being1.l > 0;
        const being1Left = being1.l < 0;
        const being1Down = being1.t > 0;
        const being1Up = being1.t < 0;
        let canRight = true;
        let canLeft = true;
        let canUp = true;
        let canDown = true;
        if (!being1Right && !being1Left && !being1Up && !being1Down) {
          being1.done = true;
          return;
        }

        const myLeft = being1.x + being1.l;
        const myRight = being1.x + being1.l + being1.width;
        const theirRight = being2.x + being2.l + being2.width;
        const theirLeft = being2.x + being2.l;

        const myOldLeft = being1.x;
        const myOldRight = being1.x + being1.width;

        const myTop = being1.y + being1.t;
        const myBottom = being1.y + being1.t + being1.width;
        const theirBottom = being2.y + being2.t + being2.width;
        const theirTop = being2.y + being2.t;


        const myOldTop = being1.y;
        const myOldBottom = being1.y + being1.width;

        if (being1Right && myLeft > theirRight) {
          // console.log('i am too much to the right and im going right', being1.id, being2.id, myLeft, theirRight);
        } else if (being1Right) {
          canRight = false;
        }

        if (being1Left && myRight < theirLeft) {
          // console.log('i am too much to the left and im going left', being1.id, being2.id);
        } else if (being1Left) {
          canLeft = false;
        }

        if (being1Down && myTop > theirBottom) {
          // console.log('i am too much to the down and im going down', being1.id, being2.id);
        } else if (being1Down) {
          canDown = false;
        }

        if (being1Up && myBottom < theirTop) {
          // console.log('i am too much to the up and im going up', being1.id, being2.id);
        } else if (being1Up) {
          canUp = false;
        }

        if (canRight && canLeft && canUp && canDown) {
          // console.log('everything is ok', being1.id, being2.id);
          being1.done = true;
          return;
        }
        const xOverlap =  ( myLeft >= theirLeft && myLeft <= theirRight || myRight <= theirRight && myRight >= theirLeft );
        const yOverlap =  ( myTop >= theirTop && myTop <= theirBottom || myBottom <= theirBottom && myBottom >= theirTop );
        const xOverlapOld =  ( myOldLeft >= theirLeft && myOldLeft <= theirRight || myOldRight <= theirRight && myOldRight >= theirLeft );
        const yOverlapOld =  ( myOldTop >= theirTop && myOldTop <= theirBottom || myOldBottom <= theirBottom && myOldBottom >= theirTop );

        if (!xOverlap && !yOverlap) {
          return;
        }
        if (xOverlap && yOverlap) {
          being1.l = 0;
          being1.t = 0;
        }
      });
    });
  }
}
