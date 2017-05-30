import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { PlayerFilterPipe } from '../../pipes/player-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [ 
    PlayerFilterPipe
  ],
  exports: [
    PlayerFilterPipe
  ]
})
export class PlayerFilterModule { }


