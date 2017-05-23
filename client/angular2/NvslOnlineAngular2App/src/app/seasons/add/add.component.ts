import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ISeason } from '../../shared/interfaces/interfaces';
import { Season } from '../../shared/models/season';

import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

    public pageTitle: string = 'Edit Season';  
    public season = new Season(0, '', false, false, '', '');

    constructor(private dataService: DataService,
                private router: Router) { }

    ngOnInit() {
    }

    submitForm(form: NgForm) {
        this.dataService.addSeason(this.season)
            .subscribe(
                data => console.log('success: ', data),
                err => console.log('error: ', err),
                () => this.router.navigate(['/seasons'])
            );
    }    

    onBack(): void {
        this.router.navigate(['/seasons']);
    }

}
