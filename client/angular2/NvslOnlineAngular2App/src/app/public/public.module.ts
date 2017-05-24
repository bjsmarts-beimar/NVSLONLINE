import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { PlayerFilterModule } from '../shared/modules/player-filter/player-filter.module';

import { TeamsComponent } from './teams/teams.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { StandingsComponent } from './standings/standings.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SignUpComponent } from './signup/signup.component';

import { DivisionFilterPipe } from '../shared/pipes/division-filter.pipe';
import { ViewTeamComponent } from './view-team/view-team.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PlayerFilterModule,
    RouterModule.forChild([
      { path: 'team', component: TeamsComponent },
      { path: 'schedule', component: SchedulesComponent },
      { path: 'standing', component: StandingsComponent },
      { path: 'contact', component: ContactsComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'vwteam/:id', component: ViewTeamComponent }
    ])
  ],
  declarations: [
    TeamsComponent, 
    SchedulesComponent, 
    StandingsComponent, 
    ContactsComponent,
    SignUpComponent, 
    DivisionFilterPipe, 
    ViewTeamComponent    
  ]
})
export class PublicModule { }