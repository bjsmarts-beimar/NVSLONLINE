import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IDivision, ISeason, ITeam } from '../../shared/interfaces/interfaces';

import { DataService } from '../../shared/services/data.service';

import { DivisionFilterPipe } from '../../shared/pipes/division-filter.pipe';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  public errorMessage: string;
  public divisions : IDivision[];
  public seasons: ISeason[];
  public teams: ITeam[];

  public selectedSeason: number;

  constructor(private dataService: DataService,
              private router: Router) 
  { }

  ngOnInit() {
    this.dataService.getSeasons()
          .subscribe(
            seasons => { 
              this.seasons = seasons;
              let s = this.seasons.filter(season => season.Active === true );
              this.selectedSeason = s[0].Id;
            },
            error => this.errorMessage = <any>error
          ); 

    this.dataService.getDivisions()
            .subscribe(
              divisions => this.divisions = divisions,                
              error => this.errorMessage = <any>error
            );

    this.dataService.getTeams()
            .subscribe(
              teams => this.teams = teams,                
              error => this.errorMessage = <any>error
            );
  }

  SeasonClicked(event: any): void { 
     
  }

}
