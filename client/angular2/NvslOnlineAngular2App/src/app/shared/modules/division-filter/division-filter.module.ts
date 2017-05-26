import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { DivisionFilterPipe } from '../../pipes/division-filter.pipe';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule
      ],
  declarations: [ 
    DivisionFilterPipe
  ],
  exports: [
    DivisionFilterPipe
  ]
})
export class DivisionFilterModule { }

