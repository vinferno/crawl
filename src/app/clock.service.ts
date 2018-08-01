import {Injectable} from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {stateActions} from './state/reducers-index';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  public tick;
  public phases = ['collectInputs', 'testMoves', 'detectCollision', 'recheckCollisions', 'move'];
  public phase = 0;

  constructor(public store: Store<any>) {
    this.store.dispatch(stateActions.clockActions.updatePhases(this.phases));
  }

  public startClock(i) {
    console.log('clock is moving at:', i);
    return interval(i).pipe(
      map(res => {
        this.store.dispatch(stateActions.clockActions.updatePhase(this.phases[res % this.phases.length]));
      })
    );
  }
}
