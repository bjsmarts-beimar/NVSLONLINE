import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';


import { TeamsComponent } from './teams.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      { path: 'teams', component: TeamsComponent },
      { path: 'addteam', component: AddTeamComponent },
      { path: 'team/:id', component: EditTeamComponent }
    ])
  ],
  declarations: [TeamsComponent, AddTeamComponent, EditTeamComponent]
})
export class TeamsModule { }
