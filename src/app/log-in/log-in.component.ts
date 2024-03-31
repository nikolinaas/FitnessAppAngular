import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private router: Router) {}
  createAccountClick(){
    this.router.navigate(['/registration']);
  }
  goToHomePage(){
    this.router.navigate(['/home']);
  }
}
