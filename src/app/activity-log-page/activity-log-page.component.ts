import { Component } from '@angular/core';
import { ActivityLogService } from '../services/activity-log.service';
import { UserService } from '../services/user.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddActivityModalComponent } from '../add-activity-modal/add-activity-modal.component';

@Component({
  selector: 'app-activity-log-page',
  templateUrl: './activity-log-page.component.html',
  styleUrls: ['./activity-log-page.component.css']
})
export class ActivityLogPageComponent {

  activities : any = [];
  constructor(private activityService:ActivityLogService,private userservice : UserService, private modalService : MdbModalService){

  }

  ngOnInit(){
    this.userservice.getLogedInUserById().subscribe((data:any)=>{
this.activities = data.dnevnikAktivnostisById;
    })
  }
  
  addActivity(){
    this.modalService.open(AddActivityModalComponent);
  }
}
