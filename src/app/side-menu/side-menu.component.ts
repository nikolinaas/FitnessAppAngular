import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  loggedIn: boolean = false;
  activityLog: any;
image : any;
  constructor(private router: Router, private modalService: MdbModalService, private http: HttpClient, private route: ActivatedRoute,private userService : UserService, private imageService : ImageService) { }


  ngOnInit() {
    if (sessionStorage.getItem("isLoggedIn") == 'true') {
      this.loggedIn = true;
    } else this.loggedIn = false;

    this.userService.getLogedInUserById().subscribe((data : any ) => {
      this.image = this.imageService.GetLoggedInUserImage(data.slikaId);
    })
   
    
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
