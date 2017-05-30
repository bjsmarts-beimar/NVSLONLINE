import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IDivision } from '../../shared/interfaces/interfaces';
import { Division } from '../../shared/models/division';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.css']
})
export class AddDivisionComponent implements OnInit {

    public pageTitle: string = 'Add Division';  
    public division = new Division(0, '', false);

    constructor(private dataService: DataService,
                private router: Router) { }

    ngOnInit() {
    }

    submitForm(form: NgForm) {
        this.dataService.addDivision(this.division)
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
