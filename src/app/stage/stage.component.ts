import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ClockService} from '../services/clock.service';
import {Store} from '@ngrx/store';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {ActivatedRoute, Router} from '@angular/router';
import {stateActions} from '../state/reducers-index';

@Component({
  selector: 'vf-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageComponent implements OnInit, OnDestroy {

  @HostBinding('style.background-color') public bgc = 'lime';
  public beings;
  public phase;
  public clockState;
  public subscriptions = [];

  constructor(
    public clock: ClockService,
    public cd: ChangeDetectorRef,
    public store: Store<any>,
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router,
  ) {

  }

  ngOnInit() {
    console.log('stage');
    const paramSub = this.route.params.subscribe(params => {
      console.log(params['config']); // (+) converts string 'id' to a number
      this.getStage(params['config']);
    });

    this.subscriptions.push(paramSub);


    const clockSub = this.store.select('clockState').subscribe(clock => {
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
    this.subscriptions.push(clockSub);
  }

  ngOnDestroy() {
    this.store.dispatch(stateActions.beingsActions.reset(null));
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  public getPhaseClass(phase) {
    return {active: phase === this.phase, inactive: phase !== this.phase};
  }


  public getStage(url) {
    this.http.get('assets/' + url + '.json').subscribe( res => {
      console.log('res', res);
      this.beings = res;
    }, error1 =>  { this.router.navigateByUrl('stage/stage-test-slide-x'); console.log('error routing', error1);});
  }

}
