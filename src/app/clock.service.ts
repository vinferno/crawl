import {Injectable} from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  public tick;
  public phases = ['testMoves', 'detectCollision', 'move'];
  public phase = 0;

  constructor() {
    this.tick = interval(40).pipe(
      map(res => this.phases[res % this.phases.length])
    );
  }
}
