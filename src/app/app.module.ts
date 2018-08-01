import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StageComponent } from 'src/app/stage/stage.component';
import { BeingComponent } from 'src/app/being/being.component';
import { DirSignalComponent } from './dir-signal/dir-signal.component';

import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {reducers} from './state/reducers-index';

@NgModule({
  declarations: [
    AppComponent,
    StageComponent,
    BeingComponent,
    DirSignalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge : 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
