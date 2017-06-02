import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
<<<<<<< HEAD

import { IDivision, ITeam, ISchedule } from '../../shared/interfaces/interfaces';

import { DataService } from '../../shared/services/data.service';

import { DivisionFilterPipe } from '../../shared/pipes/division-filter.pipe';
import { DivisionScheduleFilterPipe } from '../../shared/pipes/division-schedule-filter.pipe';
=======
import { IDivision, ISeason, ISchedule } from '../../shared/interfaces/interfaces';
import { DataService } from '../../shared/services/data.service';

import { ScheduleSeasonDivisionPipe } from '../../shared/pipes/schedule-season-division.pipe';
>>>>>>> 19fe844a6ff6e67bb3f1b277e60f6869480ebd27


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  public errorMessage: string;
  public divisions : IDivision[];
<<<<<<< HEAD
  public teams: ITeam[];
  public schedules: ISchedule[];

  constructor(private dataService: DataService,
              private router: Router) 
  { }
=======
  public seasons: ISeason[];
  public schedules: ISchedule[];
>>>>>>> 19fe844a6ff6e67bb3f1b277e60f6869480ebd27

  public selectedSeason: number;
  public selectedDivision: number;

  constructor(private dataService: DataService,
              private router: Router) 
  { }
  
  ngOnInit() {
<<<<<<< HEAD
=======

    this.dataService.getSeasons()
          .subscribe(
            seasons => { 
              this.seasons = seasons;
              let s = this.seasons.filter(season => season.Active === true );
              this.selectedSeason = s[0].Id;
            },
            error => this.errorMessage = <any>error
          ); 

>>>>>>> 19fe844a6ff6e67bb3f1b277e60f6869480ebd27
    this.dataService.getDivisions()
            .subscribe(
              divisions => this.divisions = divisions,                
              error => this.errorMessage = <any>error
            );
<<<<<<< HEAD

    this.dataService.getSchedules()
            .subscribe(
              schedules => {
                this.schedules = schedules;
                console.log(this.schedules);
              },
              error => this.errorMessage = <any>error
            );
  }
=======
    
    this.dataService.getSchedules()
            .subscribe(
              schedules => this.schedules = schedules,                
              error => this.errorMessage = <any>error
            );

  }

  SeasonClicked(event: any): void { 
     
  }

  DivisionClicked(event: any): void {
    
  }  
>>>>>>> 19fe844a6ff6e67bb3f1b277e60f6869480ebd27
}
