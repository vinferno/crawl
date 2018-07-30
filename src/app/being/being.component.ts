import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'vf-being',
  templateUrl: './being.component.html',
  styleUrls: ['./being.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeingComponent implements OnInit {

  @Input()
  public being;

  constructor() {
  }

  ngOnInit() {
  }
  
  getStyle() {
    const px = 'px';
    const style = {
      position: 'absolute',
      top: this.being.y + px,
      left: this.being.x + px,
      width: this.being.width + px,
      height: this.being.height + px,
      backgroundColor: this.being.backgroundColor,
    };
    console.log('style', style);
    return style;
  }
}
