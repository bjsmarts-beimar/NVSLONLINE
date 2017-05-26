import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { PlayerFilterModule } from '../shared/modules/player-filter/player-filter.module';
import { GameTeamFilterModule } from '../shared/modules/game-team-filter/game-team-filter.module';
import { DivisionFilterModule } from '../shared/modules/division-filter/division-filter.module';
import { DivisionScheduleFilterModule } from '../shared/modules/division-schedule-filter/division-schedule-filter.module';

import { TeamsComponent } from './teams/teams.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { StandingsComponent } from './standings/standings.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SignUpComponent } from './signup/signup.component';

import { ViewTeamComponent } from './view-team/view-team.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PlayerFilterModule,
    GameTeamFilterModule,
    DivisionFilterModule,
    DivisionScheduleFilterModule,
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
    ViewTeamComponent    
  ]
})
export class PublicModule { }
