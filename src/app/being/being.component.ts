import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {stateActions} from '../state/reducers-index';

@Component({
  selector: 'vf-being',
  templateUrl: './being.component.html',
  styleUrls: ['./being.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeingComponent implements OnInit, OnDestroy {

  @Input()
  public being: any;

  @Input()
  public phase: string;

  @Input()
  public id;

  public beings;
  public self;

  public lastL = 1;
  constructor(
    public store: Store<any>,
  ) {
  }

  ngOnInit() {
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
      this.self = state.beings[this.id];
    });
  }

  ngOnDestroy() {
  }

  public getStyle() {
    const being = this.beings[this.id];
    if (!being) {
      return {};
    }
    const px = 'px';
    return {
      width: being.width + px,
      height: being.height + px,
      backgroundColor: being.backgroundColor,
      top: being.y + px,
      left: being.x + px,
      position: 'absolute',
      'border-radius': being.borderRadius,
    };
  }

  public getImageStyle() {
    const being = this.beings[this.id];
    if (!being || !being.walking || !being.walking.left) {
      return {};
    }
    if ( being.l ) {
      this.lastL = being.l < 0 ? -1 : 1;
    }
    return {
      width: being.l ? being.walking.width : being.still.width,
      height: being.l ? being.walking.height : being.still.height,
      position: 'absolute',
      top: this.lastL < 0 ? being.walking.top : being.still.top,
      left: being.l ? being.walking.left : being.still.left,
      transform: (being.l < 0) || this.lastL < 0 ? 'scaleX(-1)' : 'scaleX(1)',
    };
  }

  public getSrc() {
    if (!this.self) {return; }
    return this.self.l ? this.self.walking.src : this.self.still.src;
  }
}
