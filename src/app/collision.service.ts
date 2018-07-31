import {Injectable} from '@angular/core';
import {ClockService} from './clock.service';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  public beings = [];

  constructor(public clock: ClockService) {
    this.clock.tick.subscribe(phase => {
      if (phase === 'detectCollision') {
        this.test();
      }
    });
  }

  public add(being) {
    this.beings.push(being);
  }

  public test() {
    this.beings.forEach(being1 => {
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
          return;
        }
        if (being1Right && being1.tx > being2.tx + being2.width) {
          console.log('i am too much to the right and im going right', being1.id, being2.id, being1.tx, being2.tx + being2.width);
        } else if (being1Right) {
          canRight = false;
        }

        if (being1Left && being1.tx + being1.width < being2.tx) {
          console.log('i am too much to the left and im going left', being1.id, being2.id);
        } else if (being1Left) {
          canLeft = false;
        }

        if (being1Down && being1.ty > being2.ty + being2.height) {
          console.log('i am too much to the down and im going down', being1.id, being2.id);
        } else if (being1Down) {
          canDown = false;
        }

        if (being1Up && being1.ty + being1.height < being2.ty) {
          console.log('i am too much to the up and im going up', being1.id, being2.id);
        } else if (being1Up) {
          canUp = false;
        }

        if (canRight && canLeft && canUp && canDown) {
          console.log('everything is ok', being1.id, being2.id);
          return;
        }


        const being2Right = being2.l > 0;
        const being2Left = being2.l < 0;
        const being2Down = being2.t > 0;
        const being2Up = being2.t < 0;


        if (being1.tx) {

        }
      });
    });
  }
}
