import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { INews } from '../shared/interfaces/interfaces';
import { News } from '../shared/models/news';

import { DataService } from '../shared/services/data.service';
import { TruncatePipe } from '../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-news',  
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

    news: INews[];
    errorMessage: string;

    constructor(private dataService: DataService,
                private router: Router) {
    }
        
    ngOnInit() {

      this.dataService.getNews()
          .subscribe(
            news => this.news = news,
            error => this.errorMessage = <any>error
          );     
    }

    remove(id: number) {
        if (confirm('Are you sure want to delete this item?')) {
            this.dataService.deleteSingleNews(id)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.reload()
            );
        }        
    }

    reload(): void {
        this.dataService.getNews()
                .subscribe(news => this.news = news,
                           error => this.errorMessage = <any>error);
        
        this.router.navigate(['/news']);
    }

}
