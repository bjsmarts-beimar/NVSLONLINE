import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IVenue } from '../shared/interfaces/interfaces';
import { Venue } from '../shared/models/venue';

import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {

    venues: IVenue[];
    errorMessage: string;

    constructor(private dataService: DataService,
                private router: Router) {
    }

    ngOnInit() {
        this.dataService.getVenues()
              .subscribe(
                venues => this.venues = venues,
                error => this.errorMessage = <any>error
              );  
    }

    remove(id: number) {
        if (confirm('Are you sure want to delete this item?')) {
            this.dataService.deleteVenue(id)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.reload()
            );
        }        
    }

    reload(): void {
        this.dataService.getVenues()
                .subscribe(venues => this.venues = venues,
                           error => this.errorMessage = <any>error);
        
        this.router.navigate(['/divisions']);
    }
}
