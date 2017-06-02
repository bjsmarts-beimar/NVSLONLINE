import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

//External Components
//import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

//Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

//Modules
import { SeasonsModule } from './seasons/seasons.module';
import { DivisionsModule } from './divisions/divisions.module';
import { VenuesModule } from './venues/venues.module';
import { NewsModule } from './news/news.module';
import { ContactsModule } from './contacts/contacts.module';
import { TeamsModule } from './teams/teams.module';
import { StandingsModule } from './standings/standings.module';
import { SchedulesModule } from './schedules/schedules.module';
import { PublicModule } from './public/public.module';

//Services
import { DataService } from './shared/services/data.service';
<<<<<<< HEAD
//import { DivisionScheduleFilterPipe } from './shared/pipes/division-schedule-filter.pipe';
=======
//import { ScheduleSeasonDivisionPipe } from './shared/pipes/schedule-season-division.pipe';
//import { ScheduleSeasonFilterPipe } from './shared/pipes/schedule-season-filter.pipe';
//import { TeamSeasonDivisionFilterPipe } from './shared/pipes/team-season-division-filter.pipe';
>>>>>>> 19fe844a6ff6e67bb3f1b277e60f6869480ebd27
//import { GameTeamFilterPipe } from './shared/pipes/game-team-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
<<<<<<< HEAD
    //DivisionScheduleFilterPipe,
=======
    //ScheduleSeasonDivisionPipe,
    //ScheduleSeasonFilterPipe,
    //TeamSeasonDivisionFilterPipe,
>>>>>>> 19fe844a6ff6e67bb3f1b277e60f6869480ebd27
    //GameTeamFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },    
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    SeasonsModule,
    DivisionsModule,
    VenuesModule,
    NewsModule,
    ContactsModule,
    TeamsModule,
    StandingsModule,
    SchedulesModule,
    PublicModule    
  ],
  providers: [
    DataService    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
