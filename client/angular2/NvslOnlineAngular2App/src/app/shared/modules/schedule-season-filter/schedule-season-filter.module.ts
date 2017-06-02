import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ScheduleSeasonFilterPipe } from '../../pipes/schedule-season-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [ 
    ScheduleSeasonFilterPipe
  ],
  exports: [
    ScheduleSeasonFilterPipe
  ]
})
export class ScheduleSeasonFilterModule { }

