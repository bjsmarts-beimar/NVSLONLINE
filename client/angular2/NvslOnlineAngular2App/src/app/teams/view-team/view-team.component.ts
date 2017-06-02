import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ISeason, IDivision, ITeam, IPlayer, ISchedule } from '../../shared/interfaces/interfaces';
import { Season } from '../../shared/models/season';
import { Division } from '../../shared/models/division';
import { Team } from '../../shared/models/team';
import { Player } from '../../shared/models/player';

import { PlayerFilterPipe } from '../../shared/pipes/player-filter.pipe';
import { GameTeamFilterPipe } from '../../shared/pipes/game-team-filter.pipe';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css']
})
export class ViewTeamComponent implements OnInit {

  public players : IPlayer[];
  public Player = new Player(0, '', '', false, 0);
  private errorMessage : string;
  public teamId : number;
  public teamName : string;
  public IsInvalid : boolean = true;
  public schedules: ISchedule[];

  @ViewChild('myModal')
  modal: ModalComponent;

  @ViewChild('myEditModal')
  editModal: ModalComponent;
  
  
  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) 
  { }

  ngOnInit() {      

      this.teamId = +this.route.snapshot.params['id'];

      this.dataService.getTeam(this.teamId)
          .subscribe(
            team => this.teamName = team.TeamName,
            error => this.errorMessage = <any>error
          );
    
      
      this.dataService.getPlayers()
          .subscribe(
            players => this.players = players,
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

  OpenModel(): void {    
    this.Player.FirstName = "";
    this.Player.LastName = "";
    this.modal.open();
  }

  routeToLink(teamId: number) : void {    

       this.teamId = teamId;
     
       this.dataService.getTeam(this.teamId)
            .subscribe(
              team => this.teamName = team.TeamName,
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

        this.dataService.getPlayers()
          .subscribe(
            players => this.players = players,
            error => this.errorMessage = <any>error
          ); 

        this.router.navigate(['/viewteam/' + this.teamId]);        
  }

  EditOpenModel(id: number): void {

    this.dataService.getPlayer(id)
          .subscribe(
            player => {
               this.Player = player;
               this.editModal.open();
            },
            error => this.errorMessage = <any>error
          );     
  }

  Save(): void {

      if ( this.Player.FirstName.length === 0 && this.Player.LastName.length === 0 )
      {
        this.IsInvalid = false;
      }
      else {

        this.Player.TeamId = this.teamId;

        this.dataService.addPlayer(this.Player)
              .subscribe(
                  data => console.log('success: ', data),
                  err => console.log('error: ', err),
                  () => this.reloadPlayers()
              );     

        this.modal.close();
      }
  }  

  update() {

    this.dataService.updatePlayer(this.Player)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => { 
                  this.reloadPlayers();
                  this.editModal.close();
                },
            );
  }

  remove(id: number) {
        if (confirm('Are you sure want to delete this item?')) {
            this.dataService.deletePlayer(id)
            .subscribe(
                data => console.log('success: ', data),                  
                err => console.log('error: ', err),
                () => this.reloadPlayers() 
            );
        }        
  }

  reloadPlayers() : void 
  {
        this.teamId = +this.route.snapshot.params['id'];
        
        this.dataService.getPlayers()
          .subscribe(
            players => this.players = players,
            error => this.errorMessage = <any>error
          ); 

        this.router.navigate(['/viewteam/' + this.teamId]);        
  }

}
