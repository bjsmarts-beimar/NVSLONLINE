import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { DivisionScheduleFilterPipe } from '../../pipes/division-schedule-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
      ],
  declarations: [ 
    DivisionScheduleFilterPipe
  ],
  exports: [
    DivisionScheduleFilterPipe
  ]
})
export class DivisionScheduleFilterModule { }

