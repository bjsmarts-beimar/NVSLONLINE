import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IDivision, ITeam, ISchedule } from '../../shared/interfaces/interfaces';

import { DataService } from '../../shared/services/data.service';

import { DivisionFilterPipe } from '../../shared/pipes/division-filter.pipe';
import { DivisionScheduleFilterPipe } from '../../shared/pipes/division-schedule-filter.pipe';


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  public errorMessage: string;
  public divisions : IDivision[];
  public teams: ITeam[];
  public schedules: ISchedule[];

  constructor(private dataService: DataService,
              private router: Router) 
  { }

  ngOnInit() {
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
