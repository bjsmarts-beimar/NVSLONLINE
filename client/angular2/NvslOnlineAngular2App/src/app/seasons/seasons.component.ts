import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ISeason } from '../shared/interfaces/interfaces';
import { Season } from '../shared/models/season';

import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {

    seasons: ISeason[];
    errorMessage: string;

    constructor(private dataService: DataService,
                private router: Router) {
    }
        
    ngOnInit() {

      this.dataService.getSeasons()
          .subscribe(
            seasons => this.seasons = seasons,
            error => this.errorMessage = <any>error
          );     
    }

    remove(id: number) {
        if (confirm('Are you sure want to delete this item?')) {
            this.dataService.deleteSeason(id)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.reload()
            );
        }        
    }

    reload(): void {
        this.dataService.getSeasons()
                .subscribe(regions => this.seasons = regions,
                           error => this.errorMessage = <any>error);
        
        this.router.navigate(['/seasons']);
    }

}
