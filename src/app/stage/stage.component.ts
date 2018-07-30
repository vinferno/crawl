import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'vf-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  public beings;

  constructor() {
  }

  ngOnInit() {
    this.beings = [
      {
        x: 0, y: 0, width: 99, height: 99, backgroundColor : 'teal'
      }
    ];
  }

}
