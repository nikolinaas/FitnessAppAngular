import { Component } from '@angular/core';
import { LogService } from '../services/log.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivityLogService } from '../services/activity-log.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-activity-modal',
  templateUrl: './add-activity-modal.component.html',
  styleUrls: ['./add-activity-modal.component.css']
})
export class AddActivityModalComponent {
  validationForm  : any;
  submitted : boolean = false;

  constructor(private acctivityService : ActivityLogService,private userService  :UserService,
  private logService:LogService, public modalRef: MdbModalRef<AddActivityModalComponent>,private modalService: MdbModalService, private http : HttpClient,  private formBuilder:FormBuilder){
    this.validationForm = this.formBuilder.group({
      exerciseType :['',[Validators.required, Validators.minLength(1)]],
      intensity :['',[Validators.required, Validators.minLength(1)]],
      duration: ['', [Validators.required, Validators.minLength(1)]],
      date: ['', [Validators.required, Validators.minLength(1)]],
      kilograms: ['', [Validators.required, Validators.minLength(1)]]
        })
  }

  onSubmit(){

    this.userService.getLogedInUserById().subscribe((user:any)=>{
      var data = {
        korisnikId: user.id,
        vrstaVjezbe: this.validationForm.get( 'exerciseType')?.value,
              trajanje: this.validationForm.get( 'duration')?.value,
              intezitet: this.validationForm.get( 'intensity')?.value,
              datumZapisa: this.validationForm.get( 'date')?.value,
              brKilograma: this.validationForm.get( 'kilograms')?.value,
      }
  this.acctivityService.postActivitiesLoggedUser(data)
    })
   ;

  }
}
