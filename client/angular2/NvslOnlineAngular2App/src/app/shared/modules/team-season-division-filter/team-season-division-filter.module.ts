import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { TeamSeasonDivisionFilterPipe } from '../../pipes/team-season-division-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [ 
    TeamSeasonDivisionFilterPipe
  ],
  exports: [
    TeamSeasonDivisionFilterPipe
  ]
})
export class TeamSeasonDivisionFilterModule { }
