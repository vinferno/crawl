import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {stateActions} from '../state/reducers-index';
import {BeingImageService} from '../services/being-image.service';

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
    public beingImage: BeingImageService,
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
      'z-index': being.zIndex
    };
  }

  public getImageStyle() {

    if (!this.self || !this.beingImage || !this.beingImage.imageConfigs || !this.beingImage.imageConfigs[this.self.beingConfig]) {
      return;
    }
    const image = this.self.l ?
      this.self.l < 0 ? this.beingImage.imageConfigs[this.self.beingConfig].movingX.left :
        this.beingImage.imageConfigs[this.self.beingConfig].movingX.right
      : this.self.lastL < 0 ? {...this.beingImage.imageConfigs[this.self.beingConfig].still.default, ...{transform: 'scaleX(-1)'}} :
        this.beingImage.imageConfigs[this.self.beingConfig].still.default;
    return image;
  }

  public getImageSrc() {
    if (!this.self || !this.beingImage || !this.beingImage.imageConfigs || !this.beingImage.imageConfigs[this.self.beingConfig]) {
      return;
    }
    return this.self.l ?
      this.self.l < 0 ? this.beingImage.imageConfigs[this.self.beingConfig].movingX.left.src :
        this.beingImage.imageConfigs[this.self.beingConfig].movingX.right.src
      : this.beingImage.imageConfigs[this.self.beingConfig].still.default.src;
  }
}
