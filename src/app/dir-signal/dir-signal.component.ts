import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'vf-dir-signal',
  templateUrl: './dir-signal.component.html',
  styleUrls: ['./dir-signal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirSignalComponent implements OnInit {
  @Input()
  public t;
  @Input()
  public l;

  constructor() {
  }

  ngOnInit() {
  }


  public getStyle(dir) {
    if (dir === 'r') {
      if (this.l > 0) {
        return {backgroundColor: 'green'};
      } else if (this.l < 0) {
        return {backgroundColor: 'red'};
      }
    }
    if (dir === 'l') {
      if (this.l < 0) {
        return {backgroundColor: 'green'};
      } else if (this.l > 0) {
        return {backgroundColor: 'red'};
      }
    }
    if (dir === 'd') {
      if (this.t > 0) {
        return {backgroundColor: 'green'};
      } else if (this.t < 0) {
        return {backgroundColor: 'red'};
      }
    }
    if (dir === 'u') {
      if (this.t < 0) {
        return {backgroundColor: 'green'};
      } else if (this.t > 0) {
        return {backgroundColor: 'red'};
      }
    }

    return {backgroundColor: 'yellow'};
  }
}
