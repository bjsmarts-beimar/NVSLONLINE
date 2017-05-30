import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ISeason, IDivision, ITeam, ISchedule } from '../shared/interfaces/interfaces';
import { Season } from '../shared/models/season';
import { Division } from '../shared/models/division';
import { Team } from '../shared/models/team';

import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  seasons: ISeason[];
  divisions: IDivision[];  
  schedules: ISchedule[];

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

    this.dataService.getSchedules()
            .subscribe(
              schedules => {
                this.schedules = schedules;
                console.log(this.schedules);
              },
              error => this.errorMessage = <any>error
            );
  }

}
