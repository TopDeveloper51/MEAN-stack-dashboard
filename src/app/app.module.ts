import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexmonsterPivotModule, FlexmonsterPivot } from 'ng-flexmonster';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexmonsterPivotModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
