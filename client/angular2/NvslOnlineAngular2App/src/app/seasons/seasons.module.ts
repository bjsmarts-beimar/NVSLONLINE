import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { SeasonsComponent } from './seasons.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'seasons', component: SeasonsComponent },
      { path: 'addseason', component: AddComponent },
      { path: 'season/:id', component: EditComponent }
    ])
  ],
  declarations: [SeasonsComponent, AddComponent, EditComponent]
})
export class SeasonsModule { }
