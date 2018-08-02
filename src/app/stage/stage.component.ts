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
  public clockState;

  constructor(public clock: ClockService, public cd: ChangeDetectorRef, public store: Store<any>) {

  }

  ngOnInit() {
    this.store.select('clockState').subscribe(clock => {
      if (!clock) {
        return;
      }
      this.clockState = clock;
      this.phase = clock.phase;
      if (clock.phase === 'collectInputs') {
        this.bgc = '#B0E2FF';
      }
      this.phase = clock.phase;
      this.cd.detectChanges();
    });

    this.beings = [
      {
        x: 400, y: 400, width: 99, height: 99, backgroundColor: 'red',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 500, y: 400, width: 99, height: 99, backgroundColor: 'orange',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 600, y: 400, width: 99, height: 99, backgroundColor: 'yellow',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 700, y: 400, width: 99, height: 99, backgroundColor: 'green',
        speed: 10, src: 'assets/grass.png'
      },
      {
        x: 1000, y: 400, width: 99, height: 99, backgroundColor: 'green',
        speed: 10, src: 'assets/grass.png'
      },
      {
        x: 700, y: 700, width: 99, height: 99, backgroundColor: 'green',
        speed: 10, src: 'assets/grass.png'
      },
      {
        x: 900, y: 200, width: 99, height: 99, backgroundColor: 'green',
        speed: 10, src: 'assets/grass.png'
      },
      {
        x: 300, y: 800, width: 99, height: 99, backgroundColor: 'green',
        speed: 10, src: 'assets/grass.png'
      },
      {
        x: 100, y: 200, width: 99, height: 99, backgroundColor: 'green',
        speed: 10, src: 'assets/grass.png'
      },
      {
        x: 300, y: 200, width: 99, height: 99, backgroundColor: 'green',
        speed: 10, src: 'assets/grass.png'
      },
      {
        x: 700, y: 510, width: 99, height: 99, backgroundColor: 'blue',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10, borderRadius: '100%'
      },
      {
        x: 700, y: 200, width: 99, height: 99, backgroundColor: 'indigo',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 700, y: 100, width: 99, height: 99, backgroundColor: 'red',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 590, y: 300, width: 99, height: 99, backgroundColor: 'indigo',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
      {
        x: 690, y: 300, width: 99, height: 99, backgroundColor: 'red',
        up: 'e', down: 'd', right: 'f', left: 's',
        speed: 10,
      },
    ];
    for (let i = 1; i < 11; i++) {
      this.beings.push(this.createGrass(i * 100, 0));
    }
    for (let i = 1; i < 11; i++) {
      this.beings.push(this.createGrass(i * 100, 900));
    }
    for (let i = 0; i < 10; i++) {
      this.beings.push(this.createGrass(1100, i * 100));
    }
    for (let i = 0; i < 10; i++) {
      this.beings.push(this.createGrass(0, i * 100));
    }
  }

  public getPhaseClass(phase) {
    return {active: phase === this.phase, inactive: phase !== this.phase};
  }

  public createGrass(x, y) {
    return {
      x, y, width: 99, height: 99, backgroundColor: 'green',
      speed: 10, src: 'assets/grass.png'
    };
  }

}
