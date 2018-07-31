import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StageComponent } from './stage/stage.component';
import { BeingComponent } from './being/being.component';
import { DirSignalComponent } from './dir-signal/dir-signal.component';

@NgModule({
  declarations: [
    AppComponent,
    StageComponent,
    BeingComponent,
    DirSignalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
