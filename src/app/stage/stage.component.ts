import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ClockService} from '../clock.service';

@Component({
  selector: 'vf-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageComponent implements OnInit {
  public beings;
  public phase;

  constructor(public clock: ClockService, public cd: ChangeDetectorRef) {
    console.log('clock', clock);
  }

  ngOnInit() {
    this.clock.tick.subscribe( phase => {
      this.phase = phase;
      this.cd.detectChanges();
    });
    this.beings = [
      {
        x: 0, y: 100, width: 99, height: 99, backgroundColor : 'teal',
        up: 'e', down: 'd', right: 'f', left: 's'
      },
      {
        x: 100, y: 200, width: 99, height: 99, backgroundColor : 'teal',
        up: 'e', down: 'd', right: 'f', left: 's'
      }
    ];
  }

}
