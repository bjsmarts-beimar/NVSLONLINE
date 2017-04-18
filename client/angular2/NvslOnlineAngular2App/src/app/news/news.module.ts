import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { NewsComponent } from './news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';

import { TruncatePipe } from '../shared/pipes/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      { path: 'news', component: NewsComponent },
      { path: 'addnews', component: AddNewsComponent },
      { path: 'news/:id', component: EditNewsComponent }
    ])
  ],
  declarations: [NewsComponent, AddNewsComponent, EditNewsComponent, TruncatePipe]
})
export class NewsModule { }
