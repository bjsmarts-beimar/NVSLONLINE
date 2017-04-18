import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { ContactsComponent } from './contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      { path: 'contacts', component: ContactsComponent },
      { path: 'addContact', component: AddContactComponent },
      { path: 'contact/:id', component: EditContactComponent }
    ])
  ],
  declarations: [ContactsComponent, AddContactComponent, EditContactComponent]
})
export class ContactsModule { }
