import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { ISeason } from '../../shared/interfaces/interfaces';
import { Season } from '../../shared/models/season';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    public pageTitle: string = 'Add Season';  
    public season = new Season(0, '', false, false, '', '');
    public iseason: ISeason;
    private errorMessage: string;
    private sub: Subscription; 

    constructor(private dataService: DataService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
              params => {
                  let id = +params['id'];
                  this.getSeason(id);
          });
    }

    getSeason(id: number) {
        this.dataService.getSeason(id).subscribe(
            season => this.iseason = season,
            error => this.errorMessage = <any>error,
            () => this.setValues(this.iseason));
    }

    setValues(season: ISeason) {
        this.season = season;
    }

    submitForm(form: NgForm) {
        this.dataService.updateSeason(this.season)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.router.navigate(['/seasons'])
            );
    }    

    onBack(): void {
        this.router.navigate(['/seasons']);
    }

}
