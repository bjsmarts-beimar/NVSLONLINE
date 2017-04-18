import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { INews } from '../../shared/interfaces/interfaces';
import { News } from '../../shared/models/news';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

    public pageTitle: string = 'Add News';  
    public singleNews = new News(0, '', '', false, '');


    constructor(private dataService: DataService,
                private router: Router) { }

    ngOnInit() {
    }

    submitForm(form: NgForm) {
        this.dataService.addSingleNews(this.singleNews)
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
