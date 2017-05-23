import { Component, OnInit } from '@angular/core';

import { INews } from '../shared/interfaces/interfaces';
import { News } from '../shared/models/news';

import { DataService } from '../shared/services/data.service';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    news: INews[];
    errorMessage: string;
    selectTitle: string;
    selectDescription: string;
    selectDateCreated: string;

    constructor(private dataService: DataService) {
    }
        
    ngOnInit() {

      this.dataService.getNews()
          .subscribe(
            news => {
              this.news = news
              this.selectTitle = this.news[0].title;
              this.selectDescription = this.news[0].description;
              this.selectDateCreated = this.news[0].created;              
            },
            error => this.errorMessage = <any>error
          );     
    }    

    selectNew(singleNew : INews) : void {
        this.selectTitle = singleNew.title;
        this.selectDescription = singleNew.description;
    }

    trimData(value: string) : string {
      return value.length > 250 ? value.substring(0, 250) + '...' : value;  
    }

}
