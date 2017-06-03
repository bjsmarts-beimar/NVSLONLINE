import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as moment from 'moment';

import { ScheduleSeasonFilterPipe } from '../shared/pipes/schedule-season-filter.pipe';

import { ISeason, IDivision, ITeam, ISchedule, IResult, IVenue, ITimeSchedule } from '../shared/interfaces/interfaces';
import { Season } from '../shared/models/season';
import { Division } from '../shared/models/division';
import { Result } from '../shared/models/results';
import { Team } from '../shared/models/team';
import { Schedule } from '../shared/models/schedule';
import { Venue } from '../shared/models/venue';
import { Timeschedule } from '../shared/models/timeschedule';

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
  teams: ITeam[];
  venues: IVenue[];

  public ischedule : ISchedule;
  public selectedSchedule = new Schedule(0, 0, null, 0, null, 0, null, '', '', 0, null, 0, null, false, 0, 0);
  public selectedHomeTeam : string;
  public selectedAwayTeam : string;
  public selectedVenue : string;

  Results = new Array<IResult>();  
  Games = new Array<ISchedule>();
  TimeSchedules = new Array<ITimeSchedule>();
  
  errorMessage: string;  
  
  public selectedSeason: number;
  public selectedDivision: number;
  public selectedModalSeason: number;

  public modalEnableGenBtn : boolean = true;

  public currentDate: string;
  public currentVenue: number = 0;
  public maxVenue: number;
  

  @ViewChild('myModal')
  modal: ModalComponent;

  @ViewChild('scoreModal')
  scoreModal: ModalComponent;

  constructor(private dataService: DataService,
              private router: Router) 
  { }

  ngOnInit() {

    this.dataService.getVenues()
              .subscribe(
                venues => { 
                    this.venues = venues;
                    
                    for (let i=0; i<this.venues.length; i++)
                    {
                        let s1 = new Timeschedule(this.venues[i], '', 18);
                        let s2 = new Timeschedule(this.venues[i], '', 20);
                        this.TimeSchedules.push(s1);
                        this.TimeSchedules.push(s2);
                    }

                    console.log('time schedule', this.TimeSchedules);

                    this.maxVenue = ( this.venues.length * 2 ) - 1;
                },
                error => this.errorMessage = <any>error
              ); 

    this.dataService.getSeasons()
        .subscribe( seasons => {

              this.seasons = seasons;

              this.dataService.getDivisions()
                  .subscribe( divisions => {

                      this.divisions = divisions;
          
                      console.log(this.divisions);

                      this.dataService.getSchedules()
                          .subscribe( schedules => {
                                
                                this.schedules = schedules;

                                this.dataService.getTeams()
                                    .subscribe( teams => {
                                        
                                        this.teams = teams;

                                        for ( let i=0; i<this.divisions.length; i++ )
                                        {      
                                            for ( let x=0; x<this.seasons.length; x++ ) 
                                            {                                                                                                                                                
                                                let t = teams.filter(team => team.Division.Id === +this.divisions[i].Id && team.Season.Id === +this.seasons[x].Id );

                                                if ( t.length > 0 )
                                                {
                                                  let result = new Result(0, '', 0, false, 0, '', null);

                                                  result.TotalCount = t.length;
                                                  result.DivisionId = this.divisions[i].Id;
                                                  result.DivisionName = this.divisions[i].DivisionName;
                                                  result.SeasonId = this.seasons[x].Id;
                                                  result.SeasonStartDate = this.seasons[x].SeasonStart;

                                                  if ( t.length > 3)
                                                    result.IsActive = true;

                                                  let teamsResults = new Array<ITeam>();

                                                  t.forEach(element => {
                                                    let team = new Team(0, '', false, 0, null, 0, null);
                                                    team.TeamName = element.TeamName;
                                                    team.Id = element.Id
                                                    teamsResults.push(team);
                                                  });

                                                  result.Teams = teamsResults;
                                                  this.Results.push(result);                                                                                                                                                  
                                                }                                        
                                            }                                                                             
                                        }                                      

                                        console.log(this.Results);                
                                        
                                      },
                                      error => this.errorMessage = <any>error
                                    );                                
                              },
                              error => this.errorMessage = <any>error
                            );
                    },                
                    error => this.errorMessage = <any>error
                  );

            },
            error => this.errorMessage = <any>error
          );        

  }

  OpenModel(): void {   

    this.modal.open();
  }

  ScoreOpenModel(id: number): void {      
        this.dataService.getSchedule(id).subscribe(
            schedule => { 
                this.ischedule = schedule;                
                this.scoreModal.open();
            },
            error => this.errorMessage = <any>error,
            () => this.setValues(this.ischedule));          
  }  

  setValues(schedule: ISchedule) {
        this.selectedSchedule = schedule;   
        this.selectedHomeTeam = schedule.HomeTeam.TeamName;     
        this.selectedAwayTeam = schedule.AwayTeam.TeamName;  
        this.selectedVenue = schedule.Venue.VenueName;      
  }

  Save(): void {

      let process : boolean = false;
    
      for ( let i=0; i<this.Results.length; i++ )
      {
          if ( this.Results[i].SeasonId === +this.selectedModalSeason )
          {
              let teams = this.Results[i].Teams;
              let gameDate = moment(this.Results[i].SeasonStartDate);

              for ( let x=0; x<teams.length; x++ )
              {
                  for ( let y=0; y<teams.length; y++ )
                  {
                      if ( teams[x].Id !== teams[y].Id ) {

                          if ( this.currentVenue === this.maxVenue ) {
                               gameDate.add(7, 'days');
                               this.currentVenue = 0; 
                          }
                                                    
                          let ts = this.GetNextVenue();                          

                          let game = new Schedule(0, 0, null, 0, null, 0, null, 'Scheduled', null, 0, null, 0, null, false, 0, 0);

                          game.HomeTeamId = teams[x].Id;
                          game.AwayTeamId = teams[y].Id;
                          game.DivisionId = this.Results[i].DivisionId;
                          game.SeasonId = this.Results[i].SeasonId;
                          game.VenueId = ts.venue.Id;

                          //let dd = moment(this.Results[i].SeasonStartDate);
                          //dd.add(7, 'days');
                          gameDate.set({hour:+ts.time, minute:0, second:0, millisecond:0});
                          
                          game.DateTime = gameDate.toString();                                                    

                          let g = this.Games.filter(game => ( game.HomeTeamId === teams[x].Id && game.AwayTeamId === teams[y].Id) || ( game.AwayTeamId === teams[x].Id && game.HomeTeamId === teams[y].Id)  )

                          if ( g.length === 0 ) 
                          {
                            this.Games.push(game);
                          }

                      }
                  }
              }
          }
      }

      for ( let index=0; index<this.Games.length; index++ )
      {
          let g = this.Games[index];
          let currentDate = moment(g.DateTime).format();
          let game = new Schedule(0, g.SeasonId, null, g.DivisionId, null, g.VenueId, null, g.Status, currentDate, g.HomeTeamId, null, g.AwayTeamId, null, false, 0, 0);

          this.dataService.addSchedule(game)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.reloading(index, this.Games.length - 1)
            );
      }       
      
  }

  reloading(start: number, end: number) : void {
        if ( start === end ) {
            this.modal.close();
            this.reload();
        }
  }

  GetNextVenue(): Timeschedule {
      
      let nextVenue = this.TimeSchedules[this.currentVenue];

      this.currentVenue += 1;                

      return nextVenue;
  }

  SeasonClicked(event: any): void {    

  }

  DivisionClicked(event: any): void {

  }

  updateStatusScore(): void {    

        this.dataService.updateSchedule(this.selectedSchedule)
            .subscribe(
                data => { 
                    console.log('success: ', data);
                    this.scoreModal.close();
                },
                err => console.log('error: ', err),
                () => this.reload()
            );
  }

   reload(): void {
        this.dataService.getSchedules()
            .subscribe(
              schedules => this.schedules = schedules,               
              error => this.errorMessage = <any>error
            );
        
        this.router.navigate(['/schedules']);
  }

  ModalSeasonClicked(event: any): void {
    this.modalEnableGenBtn = false;
  }

}
