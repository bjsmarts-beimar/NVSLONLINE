import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

//external components
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

//pipes
import { PlayerFilterModule } from '../shared/modules/player-filter/player-filter.module';
import { GameTeamFilterModule } from '../shared/modules/game-team-filter/game-team-filter.module';
import { TeamSeasonDivisionFilterModule} from '../shared/modules/team-season-division-filter/team-season-division-filter.module';

//components
import { TeamsComponent } from './teams.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { ViewTeamComponent } from './view-team/view-team.component';

//import { PlayerFilterPipe } from '../shared/pipes/player-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      { path: 'teams', component: TeamsComponent },
      { path: 'addteam', component: AddTeamComponent },
      { path: 'team/:id', component: EditTeamComponent },
      { path: 'viewteam/:id', component: ViewTeamComponent }
    ]),
    Ng2Bs3ModalModule,
    PlayerFilterModule,
    GameTeamFilterModule,
    TeamSeasonDivisionFilterModule
  ],
  declarations: [
    TeamsComponent, 
    AddTeamComponent, 
    EditTeamComponent, 
    ViewTeamComponent
    ]
})
export class TeamsModule { }
