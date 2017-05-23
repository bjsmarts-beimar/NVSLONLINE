import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { TeamsComponent } from './teams/teams.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { StandingsComponent } from './standings/standings.component';
import { ContactsComponent } from './contacts/contacts.component';

import { DivisionFilterPipe } from '../shared/pipes/division-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      { path: 'team', component: TeamsComponent },
      { path: 'schedule', component: SchedulesComponent },
      { path: 'standing', component: StandingsComponent },
      { path: 'contact', component: ContactsComponent }
    ])
  ],
  declarations: [TeamsComponent, SchedulesComponent, StandingsComponent, ContactsComponent, DivisionFilterPipe]
})
export class PublicModule { }
