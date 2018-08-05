import {Component, HostListener, OnInit} from '@angular/core';
import {InputsService} from './services/inputs.service';
import {Store} from '@ngrx/store';
import {stateActions} from './state/reducers-index';
import {ClockService} from './services/clock.service';
import {DirectionService} from './services/direction.service';
import {MoveService} from './services/move.service';
import {CollisionService} from './services/collision.service';
import {AdjustService} from './services/adjust.service';

@Component({
  selector: 'vf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public buttons = {};

  public state;

  public start;

  public clockSpeed;

  constructor(
    public input: InputsService,
    public store: Store<any>,
    public clock: ClockService,
    public direction: DirectionService,
    public collision: CollisionService,
    public adjust: AdjustService,
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
        console.log('collectInputs');
        this.collectInputs();
      }

      if (clock.phase === 'testDirections') {
        console.log('testDirections');
        this.testDirections();
      }

      if (clock.phase === 'detectCollision') {
        console.log('dectectCollision');
        this.detectCollision();
        this.testAdjust();
      }

      if (clock.phase === 'adjust') {
        console.log('adjust');
        this.detectCollision();
        this.testAdjust();
      }
      if (clock.phase === 'move') {
        console.log('move');
        this.moveNow();
      }
    });

    this.playPause();
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

  public testAdjust() {
    this.adjust.adjust();
  }

  public moveNow() {
    this.move.move();
  }

  public playPause() {
    if (this.start) {
      this.start.unsubscribe();
      this.start = null;
    } else {
      this.start = this.clock.startClock().subscribe();
    }
  }
}
