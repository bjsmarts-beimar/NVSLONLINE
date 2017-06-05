import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { StatisticsFilterPipe } from '../../pipes/statistics-filter.pipe';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
      ],
  declarations: [ 
    StatisticsFilterPipe
  ],
  exports: [
    StatisticsFilterPipe
  ]
})
export class StatisticsFilterModule { }


