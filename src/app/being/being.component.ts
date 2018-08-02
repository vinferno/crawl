import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
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

  public beings;
  public self;

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
}
