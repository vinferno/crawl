import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StageComponent} from './stage/stage.component';

const routes: Routes = [
  {path: 'stage1', component: StageComponent},
  {path: '**', redirectTo: 'stage1'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
