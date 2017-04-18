import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { DivisionsComponent } from './divisions.component';
import { AddDivisionComponent } from './add-division/add-division.component';
import { EditDivisionComponent } from './edit-division/edit-division.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'divisions', component: DivisionsComponent },
      { path: 'addDivision', component: AddDivisionComponent },
      { path: 'division/:id', component: EditDivisionComponent }
    ])
  ],
  declarations: [DivisionsComponent, AddDivisionComponent, EditDivisionComponent]
})
export class DivisionsModule { }
