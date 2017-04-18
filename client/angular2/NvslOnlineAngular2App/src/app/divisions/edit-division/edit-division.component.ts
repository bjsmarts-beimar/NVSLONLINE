import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IDivision } from '../../shared/interfaces/interfaces';
import { Division } from '../../shared/models/division';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-edit-division',
  templateUrl: './edit-division.component.html',
  styleUrls: ['./edit-division.component.css']
})
export class EditDivisionComponent implements OnInit {

    public pageTitle: string = 'Add Season';  
    public division = new Division(0, '', false);
    public idivision: IDivision;
    private errorMessage: string;
    private sub: Subscription; 

    constructor(private dataService: DataService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
              params => {
                  let id = +params['id'];
                  this.getDivision(id);
          });
    }

    getDivision(id: number) {
        this.dataService.getDivision(id).subscribe(
            division => this.idivision = division,
            error => this.errorMessage = <any>error,
            () => this.setValues(this.idivision));
    }

    setValues(division: IDivision) {
        this.division = division;
    }

    submitForm(form: NgForm) {
        this.dataService.updateDivision(this.division)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.router.navigate(['/divisions'])
            );
    }    

    onBack(): void {
        this.router.navigate(['/divisions']);
    }

}
