import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

//external components
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ScheduleSeasonFilterModule } from '../shared/modules/schedule-season-filter/schedule-season-filter.module';
import { ScheduleSeasonDivisionModule } from '../shared/modules/schedule-season-division/schedule-season-division.module';

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
    ]),
    Ng2Bs3ModalModule,
    ScheduleSeasonFilterModule,
    ScheduleSeasonDivisionModule
  ],
  declarations: [SchedulesComponent, AddScheduleComponent]
})
export class SchedulesModule { }
