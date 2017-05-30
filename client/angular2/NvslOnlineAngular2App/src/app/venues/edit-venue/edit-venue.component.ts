import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IVenue } from '../../shared/interfaces/interfaces';
import { Venue } from '../../shared/models/venue';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-edit-venue',
  templateUrl: './edit-venue.component.html',
  styleUrls: ['./edit-venue.component.css']
})
export class EditVenueComponent implements OnInit {

  public pageTitle: string = 'Add Season';  
    public venue = new Venue(0, '', false);
    public ivenue: IVenue;
    private errorMessage: string;
    private sub: Subscription; 

    constructor(private dataService: DataService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
              params => {
                  let id = +params['id'];
                  this.getVenue(id);
          });
    }

    getVenue(id: number) {
        this.dataService.getVenue(id).subscribe(
            venue => this.ivenue = venue,
            error => this.errorMessage = <any>error,
            () => this.setValues(this.ivenue));
    }

    setValues(venue: IVenue) {
        this.venue = venue;
    }

    submitForm(form: NgForm) {
        this.dataService.updateVenue(this.venue)
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
