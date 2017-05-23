import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription }       from 'rxjs/Subscription';

import { ISeason, IDivision, ITeam } from '../../shared/interfaces/interfaces';
import { Season } from '../../shared/models/season';
import { Division } from '../../shared/models/division';
import { Team } from '../../shared/models/team';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

    pageTitle: string = "Add Team";
    errorMessage: string;
    public selectedSeason: number;
    public selectedDivision: number;
    private sub: Subscription; 

    seasons: ISeason[];
    divisions: IDivision[];    

    public team = new Team(0, '', false, 0, null, 0, null);
    public iteam: ITeam;
    public idivision: IDivision;

    constructor(private dataService: DataService,
                private router: Router,
                private route: ActivatedRoute) 
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

        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getRegion(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getRegion(id: number) {
        this.dataService.getTeam(id).subscribe(
            team => this.iteam = team,
            error => this.errorMessage = <any>error,
            () => this.setValues(this.iteam));
    }    

    setValues(team: ITeam) {
        this.team = team;
        this.selectedDivision = team.DivisionId;
        this.selectedSeason = team.SeasonId;
    }

    onBack(): void {
        this.router.navigate(['/teams']);
    }

    submitForm(form: NgForm) {

        this.team.DivisionId = this.selectedDivision;
        this.team.SeasonId = this.selectedSeason;

        this.dataService.getDivision(this.selectedDivision).subscribe(
             division => {
                
                this.team.Division = division;
                
                this.dataService.getSeason(this.selectedSeason).subscribe(
                    season => {
                        
                        this.team.Season = season;

                        this.dataService.updateTeam(this.team)
                            .subscribe(
                                data => console.log('success: ', data),
                                err => console.log('error: ', err),
                                () => this.router.navigate(['/teams'])
                            );                                                  
                    },
                    error => this.errorMessage = <any>error,
                    );  
             },
             error => this.errorMessage = <any>error,
             );                              
    }  
}
