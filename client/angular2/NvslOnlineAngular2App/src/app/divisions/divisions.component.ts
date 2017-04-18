import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IDivision } from '../shared/interfaces/interfaces';
import { Division } from '../shared/models/division';

import { DataService } from '../shared/services/data.service';


@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit {

    divisions: IDivision[];
    errorMessage: string;

    constructor(private dataService: DataService,
                private router: Router) {
    }

    ngOnInit() {
      this.dataService.getDivisions()
            .subscribe(
              divisions => this.divisions = divisions,
              error => this.errorMessage = <any>error
            );  
    }

    remove(id: number) {
        if (confirm('Are you sure want to delete this item?')) {
            this.dataService.deleteDivision(id)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.reload()
            );
        }        
    }

    reload(): void {
        this.dataService.getDivisions()
                .subscribe(divisions => this.divisions = divisions,
                           error => this.errorMessage = <any>error);
        
        this.router.navigate(['/divisions']);
    }

}
