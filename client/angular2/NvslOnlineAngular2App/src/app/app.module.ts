import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

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

//Services
import { DataService } from './shared/services/data.service';

//Pipes
//import { TruncatePipe } from './shared/pipes/truncate.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    //TruncatePipe
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
    ContactsModule
  ],
  providers: [
    DataService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
