import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ScheduleSeasonDivisionPipe } from '../../pipes/schedule-season-division.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [ 
    ScheduleSeasonDivisionPipe
  ],
  exports: [
    ScheduleSeasonDivisionPipe
  ]
})
export class ScheduleSeasonDivisionModule { }



