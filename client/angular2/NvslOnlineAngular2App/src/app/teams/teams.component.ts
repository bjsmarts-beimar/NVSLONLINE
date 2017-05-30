import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ISeason, IDivision, ITeam } from '../shared/interfaces/interfaces';
import { Season } from '../shared/models/season';
import { Division } from '../shared/models/division';
import { Team } from '../shared/models/team';

import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  seasons: ISeason[];
  divisions: IDivision[];
  teams: ITeam[];

  errorMessage: string;

  public selectedSeason: number;
  public selectedDivision: number;

  constructor(private dataService: DataService,
              private router: Router) 
  { }

  ngOnInit() {

    this.dataService.getSeasons()
          .subscribe(
            seasons => this.seasons = seasons,
            error => this.errorMessage = <any>error
          ); 

    this.dataService.getDivisions()
            .subscribe(
              divisions => this.divisions = divisions,                
              error => this.errorMessage = <any>error
            );

    this.dataService.getTeams()
            .subscribe(
              teams => {
                this.teams = teams;
                console.log(this.teams);
              },
              error => this.errorMessage = <any>error
            );

  }

  remove(id: number) {
        if (confirm('Are you sure want to delete this item?')) {
            this.dataService.deleteTeam(id)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.reload()
            );
        }        
  }

  reload(): void {
        this.dataService.getTeams()
            .subscribe(
              teams => this.teams = teams,               
              error => this.errorMessage = <any>error
            );
        
        this.router.navigate(['/teams']);
  }

  onChangeUpdate(event: any): void { 

  }

  onChangeDivisionUpdate(event: any): void {

  }

}
