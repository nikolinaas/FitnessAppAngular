import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  loggedIn: boolean = false;
  activityLog: any;

  constructor(private router: Router, private modalService: MdbModalService, private http: HttpClient, private route: ActivatedRoute) { }


  ngOnInit() {
    if (sessionStorage.getItem("isLoggedIn") == 'true') {
      this.loggedIn = true;
    } else this.loggedIn = false;

  }

  clickHome() {
    this.router.navigate(['/home']);
  }
  clickPrograms() {
    this.router.navigate(['/programs']);
  }

  clickActivityJournal() {
    this.router.navigate(['/activitylogs']);
  }

  clickMessages() {
    this.router.navigate(['/messages']);
  }
  clickCategories() {
    this.router.navigate(['/categories']);
  }

  clickAccount() {
    this.router.navigate(['/account']);
  }

  clickLogOut() {
    this.router.navigate(['/login/0']);
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("userId", "0");

  }

  clickMyPrograms() {
    this.router.navigate(['/myPrograms'])
  }
}
