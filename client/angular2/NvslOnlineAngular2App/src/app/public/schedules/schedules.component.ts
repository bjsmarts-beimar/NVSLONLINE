import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDivision, ISeason, ISchedule } from '../../shared/interfaces/interfaces';
import { DataService } from '../../shared/services/data.service';

import { ScheduleSeasonDivisionPipe } from '../../shared/pipes/schedule-season-division.pipe';


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  public errorMessage: string;
  public divisions : IDivision[];
  public seasons: ISeason[];
  public schedules: ISchedule[];

  public selectedSeason: number;
  public selectedDivision: number;

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
}
