import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { StandingsComponent } from './standings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      { path: 'standings', component: StandingsComponent }      
    ])
  ],
  declarations: [StandingsComponent]
})
export class StandingsModule { }
