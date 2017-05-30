import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IVenue } from '../../shared/interfaces/interfaces';
import { Venue } from '../../shared/models/venue';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {

    public pageTitle: string = 'Add Venue';  
    public venue = new Venue(0, '', false);

    constructor(private dataService: DataService,
                private router: Router) { }

    ngOnInit() {
    }

    submitForm(form: NgForm) {
        this.dataService.addVenue(this.venue)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.router.navigate(['/venues'])
            );
    }    

    onBack(): void {
        this.router.navigate(['/venues']);
    }

}
