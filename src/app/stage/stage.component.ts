import {Component, OnInit} from '@angular/core';
import {ClockService} from '../clock.service';

@Component({
  selector: 'vf-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  public beings;
  public phase;

  constructor(public clock: ClockService) {
    console.log('clock', clock);
  }

  ngOnInit() {
    this.clock.tick.subscribe( phase => {
      this.phase = phase;
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
