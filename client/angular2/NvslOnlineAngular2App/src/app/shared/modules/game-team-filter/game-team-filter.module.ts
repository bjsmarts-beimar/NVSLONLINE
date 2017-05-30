import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { GameTeamFilterPipe } from '../../pipes/game-team-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [ 
    GameTeamFilterPipe
  ],
  exports: [
    GameTeamFilterPipe
  ]
})
export class GameTeamFilterModule { }
