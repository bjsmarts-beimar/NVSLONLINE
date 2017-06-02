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
    public season = new Season(0, '', false, false, '', '');
    public iseason: ISeason;

    constructor(private dataService: DataService,
                private router: Router) {
    }
        
    ngOnInit() {

      this.dataService.getSeasons()
          .subscribe(
            seasons => { 
                this.seasons = seasons;
                console.log('seasons: ', seasons);
            },
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

    ItemSelected(id: number, active: boolean) {
        
        this.dataService.getSeason(id).subscribe(
            season => {
                
                this.iseason = season;
                
            },
            error => this.errorMessage = <any>error,
            () => this.setValues(this.iseason, active));        
    }

    reload(): void {
        this.dataService.getSeasons()
                .subscribe(regions => this.seasons = regions,
                           error => this.errorMessage = <any>error);
        
        this.router.navigate(['/seasons']);
    }

    setValues(season: ISeason, active: boolean) {

        this.season = season;

        let s = this.seasons.filter(season => season.Active === true );

        this.season.Active = !active;

        if ( s.length > 0 ) {
                    
            this.dataService.updateSeason(this.season)
                 .subscribe(
                      data => {
                           console.log('success: ', data);
                           this.reload();
                      },
                      err => console.log('error: ', err)
                  );            

            let activeSeason = s[0];
            activeSeason.Active = false;

            this.dataService.updateSeason(activeSeason)
                 .subscribe(
                      data => {
                           console.log('success: ', data);
                           this.reload();
                      },
                      err => console.log('error: ', err)
                  );                   
        }
        else {            
        
             this.dataService.updateSeason(this.season)
                 .subscribe(
                      data => {
                           console.log('success: ', data);
                           this.reload();
                      },
                      err => console.log('error: ', err)
                  );
        }
    }

}
