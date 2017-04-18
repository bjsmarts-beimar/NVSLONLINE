import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { INews } from '../../shared/interfaces/interfaces';
import { News } from '../../shared/models/news';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

    public pageTitle: string = 'Edit News';  
    public singleNews = new News(0, '', '', false, '');
    public inews: INews;
    private errorMessage: string;
    private sub: Subscription; 

    constructor(private dataService: DataService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
              params => {
                  let id = +params['id'];
                  this.getNews(id);
          });
    }

    getNews(id: number) {
        this.dataService.getSingleNews(id).subscribe(
            news => this.inews = news,
            error => this.errorMessage = <any>error,
            () => this.setValues(this.inews));
    }

    setValues(news: INews) {
        this.singleNews = news;
    }

    submitForm(form: NgForm) {
        this.dataService.updateSingleNews(this.singleNews)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.router.navigate(['/news'])
            );
    }    

    onBack(): void {
        this.router.navigate(['/news']);
    }

}
