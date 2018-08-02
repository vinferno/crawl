import {Component, HostListener, OnInit} from '@angular/core';
import {InputsService} from './inputs.service';
import {Store} from '@ngrx/store';
import {stateActions} from './state/reducers-index';
import {ClockService} from './clock.service';
import {DirectionService} from './direction.service';
import {MoveService} from './move.service';
import {CollisionService} from './collision.service';

@Component({
  selector: 'vf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public buttons = {};
  public phases = ['testMoves', 'detectCollision', 'move'];
  public phase = 0;

  public state;

  constructor(
    public input: InputsService,
    public store: Store<any>,
    public clock: ClockService,
    public direction: DirectionService,
    public collision: CollisionService,
    public move: MoveService,
  ) {
    this.store.subscribe(state => this.state = state);

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardPress(event: KeyboardEvent) {
    this.addKeyPress(event);
    this.buttons[event.key] = true;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardUp(event: KeyboardEvent) {
    this.addKeyPress(event);
    this.buttons[event.key] = false;
  }

  ngOnInit() {
    this.store.select('clockState').subscribe(clock => {
      // console.log('app component clock', clock);
      if (!clock) {
        return;
      }
      if (clock.phase === 'collectInputs') {
        this.collectInputs();
      }

      if (clock.phase === 'testMoves') {
        this.testDirections();
      }

      if (clock.phase === 'detectCollision') {
        this.detectCollision();
      }

      if (clock.phase === 'recheckCollisions') {
        this.detectCollision();
      }
      if (clock.phase === 'move') {
        this.moveNow();
      }
    });

    this.clock.startClock(40).subscribe();
  }

  public addKeyPress(key) {
    this.input.addKeyPress(key);
  }

  public collectInputs() {
    this.store.dispatch(stateActions.inputsActions.updateKeys({...this.buttons}));
  }

  public testDirections() {
    this.direction.testDirs();
  }

  public detectCollision() {
    this.collision.test();
  }

  public moveNow() {
    this.move.move();
  }
}
