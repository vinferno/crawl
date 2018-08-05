import {Injectable} from '@angular/core';
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {stateActions} from '../state/reducers-index';

@Injectable({
  providedIn: 'root'
})
export class ClockService {
  public tick;
  public phases = ['collectInputs', 'testDirections', 'detectCollision', 'adjust', 'move'];
  public speed = 100;

  constructor(public store: Store<any>) {
    this.store.dispatch(stateActions.clockActions.updatePhases(this.phases));
  }

  public startClock() {
    return interval(this.speed ? this.speed : 60).pipe(
      map(res => {
        this.store.dispatch(stateActions.clockActions.updatePhase(this.phases[res % this.phases.length]));
      })
    );
  }
}
