import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { VenuesComponent } from './venues.component';
import { AddVenueComponent } from './add-venue/add-venue.component';
import { EditVenueComponent } from './edit-venue/edit-venue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'venues', component: VenuesComponent },
      { path: 'addVenue', component: AddVenueComponent },
      { path: 'venue/:id', component: EditVenueComponent }
    ])

  ],
  declarations: [VenuesComponent, AddVenueComponent, EditVenueComponent]
})
export class VenuesModule { }


