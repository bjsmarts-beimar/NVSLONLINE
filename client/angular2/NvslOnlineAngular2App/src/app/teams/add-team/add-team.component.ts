import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ISeason, IDivision } from '../../shared/interfaces/interfaces';
import { Season } from '../../shared/models/season';
import { Division } from '../../shared/models/division';
import { Team } from '../../shared/models/team';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  pageTitle: string = "Add Team";
  errorMessage: string;
  public selectedSeason: number;
  public selectedDivision: number;

  seasons: ISeason[];
  divisions: IDivision[];

  public team = new Team(0, '', false, 0, null, 0, null);

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
  }

  submitForm(form: NgForm) {

      this.team.DivisionId = this.selectedDivision;
      this.team.SeasonId = this.selectedSeason;       

      this.dataService.addTeam(this.team)
              .subscribe(
                  data => console.log('success: ', data),
                  err => console.log('error: ', err),
                  () => this.router.navigate(['/teams'])
              );          
  }

  onBack(): void {
        this.router.navigate(['/teams']);
    }
}
