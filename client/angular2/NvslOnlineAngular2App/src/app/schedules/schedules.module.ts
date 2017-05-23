import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { SchedulesComponent } from './schedules.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      { path: 'schedules', component: SchedulesComponent },
      { path: 'addschedule', component: AddScheduleComponent }      
    ])
  ],
  declarations: [SchedulesComponent, AddScheduleComponent]
})
export class SchedulesModule { }
