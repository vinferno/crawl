import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {InputsService} from '../inputs.service';
import {ClockService} from '../clock.service';
import {CollisionService} from '../collision.service';
import {Store} from '@ngrx/store';
import {stateActions} from '../state/reducers-index';

@Component({
  selector: 'vf-being',
  templateUrl: './being.component.html',
  styleUrls: ['./being.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeingComponent implements OnInit {

  @Input()
  public being: any;

  @Input()
  public phase: string;

  @Input()
  public id;

  public l = 0;
  public t = 0;
  public z = 0;

  public tu = false;
  public td = false;
  public tr = false;
  public tl = false;

  public speed = 10;

  public x = 0;
  public y = 0;

  public tx = 0;
  public ty = 0;

  public width = '0px';
  public height = '0px';

  public beings;

  constructor(
    public inputs: InputsService,
    public clock: ClockService,
    public collision: CollisionService,
    public store: Store<any>,
  ) {
  }

  ngOnInit() {
    this.collision.add(this);
    this.inputs.pressed.subscribe(key => {
      if (!key || this.phase !== 'testMoves') {
        return;
      }
      if (key.type === 'keydown') {
        console.log('key down', key);
        if (key.key === this.being.up) {
          this.tu = true;
        }
        if (key.key === this.being.down) {
          this.td = true;
        }
        if (key.key === this.being.left) {
          this.tl = true;
        }
        if (key.key === this.being.right) {
          this.tr = true;
        }
      }

      if (key.type === 'keyup') {
        console.log('key up', key);
        if (key.key === this.being.up) {
          this.tu = false;
        }
        if (key.key === this.being.down) {
          this.td = false;
        }
        if (key.key === this.being.left) {
          this.tl = false;
        }
        if (key.key === this.being.right) {
          this.tr = false;
        }
      }
    });


    this.x = this.being.x;
    this.y = this.being.y;
    this.z = this.being.z;
    this.tx = this.being.x;
    this.ty = this.being.y;
    this.height = this.being.height;
    this.width = this.being.width;

    this.store.dispatch(stateActions.beingsActions.add(
      {
        ...this.being,
        ...{
          tx: this.being.x,
          ty: this.being.y,
          l: 0,
          t: 0,
          id: this.id
        }
      }
    ));
    this.store.select('beingsState').subscribe(state => {
      this.beings = state.beings;
    });
  }

  public getStyle(id) {
    const px = 'px';
    return {
      ...this.beings[id],
      ...{
        position: 'absolute',
        top: this.y + px,
        left: this.x + px,
        width: this.width + px,
        height: this.height + px,
        backgroundColor: this.being.backgroundColor,
      },
    };
  }

  public move() {
    this.x = this.x + this.l;
    this.y = this.y + this.t;
  }
}
