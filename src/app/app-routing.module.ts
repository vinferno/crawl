import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StageComponent} from './stage/stage.component';
import {StageSelectComponent} from './stage-select/stage-select.component';

const routes: Routes = [
  {path: 'stage-select', component: StageSelectComponent},
  {path: 'stage/:config', component: StageComponent},
  {path: '**', redirectTo: 'stage-select'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
