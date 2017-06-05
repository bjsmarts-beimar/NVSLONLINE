import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IDivision, ISeason, ITeam, ISchedule, IStatistics } from '../../shared/interfaces/interfaces';
import { Statistics } from '../../shared/models/statistics';
import { StatisticsFilterPipe } from '../../shared/pipes/statistics-filter.pipe';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  public errorMessage: string;
  public divisions : IDivision[];
  public seasons: ISeason[];  
  public schedules: ISchedule[];
  public teams: ITeam[];  
  public statistics = new Array<IStatistics>(); 
  public Stat: IStatistics[];

  // public statisticRow = new Statistics('');


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

              this.dataService.getDivisions()
                  .subscribe(
                    divisions => { 
                      this.divisions = divisions;

                          this.dataService.getSchedules()
                              .subscribe( schedules => {

                                this.schedules = schedules;

                                this.dataService.getTeams()
                                      .subscribe( teams => {
                                                    
                                          this.teams = teams;

                                          for (let i=0; i<this.teams.length; i++)
                                          {        
                                              let t = this.teams[i];                          
                                              if ( t.SeasonId === this.selectedSeason )
                                              {
                                                  let wins = 0;
                                                  let loses = 0;
                                                  let ties = 0;
                                                  let points = 0;

                                                  let ts = this.schedules.filter(s => s.DivisionId === t.DivisionId && s.SeasonId === t.SeasonId && s.AwayTeamId === t.Id || s.HomeTeamId === t.Id )                                                  

                                                  for( let index=0; index<ts.length; index++)
                                                  {
                                                      let game = ts[index];

                                                      if ( game.Status === 'Played') {
                                                          
                                                          if( t.Id === game.HomeTeamId )
                                                          {
                                                              if ( game.GoalsHomeTeam > game.GoalsAwayTeam )
                                                              {
                                                                  wins = wins + 1;
                                                                  points = points + 3;
                                                              }
                                                              else if ( game.GoalsHomeTeam < game.GoalsAwayTeam )
                                                              {
                                                                  loses = loses + 1;
                                                              }
                                                              else {
                                                                  ties = ties + 1;
                                                                  points = points + 1;
                                                              }
                                                          }
                                                          if ( t.Id === game.AwayTeamId )
                                                          {
                                                               if ( game.GoalsAwayTeam > game.GoalsHomeTeam )
                                                               {
                                                                    wins = wins + 1;
                                                                    points = points + 3;
                                                               }
                                                               else if ( game.GoalsAwayTeam < game.GoalsHomeTeam ) {
                                                                    loses = loses + 1;
                                                               }
                                                               else {
                                                                    ties = ties + 1;
                                                                    points = points + 1;
                                                               }
                                                          }
                                                      }

                                                  }

                                                  let statisticRow = new Statistics( t.TeamName, t.DivisionId, t.SeasonId, wins, loses, ties, points);
                                                  this.statistics.push(statisticRow);
                                              }
                                          }

                                          this.Stat = this.statistics;                                          
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

  DivisionClicked(event: any): void {
    
  }  

}
