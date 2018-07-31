import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {InputsService} from '../inputs.service';
import {ClockService} from '../clock.service';
import {CollisionService} from '../collision.service';

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

  constructor(public inputs: InputsService, public clock: ClockService, public collision: CollisionService) {
  }

  ngOnInit() {
    this.collision.add(this);
    this.inputs.pressed.subscribe(key => {
      if (!key) {
        return;
      }
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
    });
    this.inputs.up.subscribe(key => {
      if (!key) {
        return;
      }
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
    });
    this.x = this.being.x;
    this.y = this.being.y;
    this.z = this.being.z;
    this.tx = this.being.x;
    this.ty = this.being.y;
    this.height = this.being.height;
    this.width = this.being.width;

    this.clock.tick.subscribe(phase => {
      if (phase === 'testMoves') {
        // first get direction change and store it in t and l;
        // no movement
        if (!this.tu && !this.td) {
          this.t = 0;
        }
        if (!this.tl && !this.tr) {
          this.l = 0;
        }
        // end no movement
        if (this.tu) {
          this.t = -this.speed;
        }
        if (this.td) {
          this.t = this.speed;
        }
        if (this.tl) {
          this.l = -this.speed;
        }
        if (this.tr) {
          this.l = this.speed;
        }

        this.tx = this.x + this.l;
        this.ty = this.y + this.t;
      }

      if (phase === 'move') {
        this.move();
      }
    });
  }

  public getStyle() {
    const px = 'px';
    return {
      position: 'absolute',
      top: this.y + px,
      left: this.x + px,
      width: this.width + px,
      height: this.height + px,
      backgroundColor: this.being.backgroundColor,
    };
  }

  public move() {
    this.x = this.x + this.l;
    this.y = this.y + this.t;
  }
}
