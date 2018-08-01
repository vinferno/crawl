import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {ClockService} from '../clock.service';
import {Store} from '@ngrx/store';

@Component({
  selector: 'vf-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageComponent implements OnInit {

  @HostBinding('style.background-color') public bgc = 'lime';
  public beings;
  public phase;

  constructor(public clock: ClockService, public cd: ChangeDetectorRef, public store: Store<any>) {

  }

  ngOnInit() {
    this.store.select('clockState').subscribe(clock => {
      if (!clock) {
        return;
      }
      this.phase = clock.phase;
      if (clock.phase === 'collectInputs') {
        this.bgc = '#B0E2FF';
      }
      // if (phase.phase === 'detectCollision') {
      //   this.bgc = 'pink';
      // }
      // if (phase.phase === 'move') {
      //   this.bgc = '#B0E2FF';
      // }
      this.phase = clock.phase;
      this.cd.detectChanges();
    });

    this.beings = [
      {
        x: 400, y: 100, width: 99, height: 99, backgroundColor: 'teal',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 500, y: 200, width: 99, height: 99, backgroundColor: 'teal',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 600, y: 300, width: 99, height: 99, backgroundColor: 'teal',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 700, y: 400, width: 99, height: 99, backgroundColor: 'teal',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      }
    ];
  }

  public getPhaseClass(phase) {
    return {active: phase === this.phase, inactive: phase !== this.phase};
  }

}
