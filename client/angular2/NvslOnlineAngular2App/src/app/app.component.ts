import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Northern Virginia Soccer League';
  userLogin: boolean = false;
  sidebar: boolean = true;

  constructor(private router: Router) { }

  LogIn() : void {
    this.userLogin = true;
    this.sidebar = false;
    this.router.navigate(['/dashboard']);
  }

  LogOut() : void {
    this.userLogin = false;
    this.sidebar = true;
    this.router.navigate(['/home']);
  }

  Season() : void {
    this.userLogin = true;
    this.sidebar = false;
    this.router.navigate(['/dashboard']);
  }
}
