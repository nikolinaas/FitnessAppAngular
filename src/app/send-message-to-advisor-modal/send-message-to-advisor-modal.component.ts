import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-send-message-to-advisor-modal',
  templateUrl: './send-message-to-advisor-modal.component.html',
  styleUrls: ['./send-message-to-advisor-modal.component.css']
})
export class SendMessageToAdvisorModalComponent {

  validationForm : any;
  savjetnici : any = [];
  getSavjetniciURL = "http://localhost:9000/savjetnici";
  postPorukaURL = "http://localhost:9000/porukeSavjetniku"
  getUserByccIdURL : string = "http://localhost:9000/korisnici/nalog/";
  userToReceiveID : any;
  userID  :any;
  constructor(private logService:LogService,private modalService:MdbModalService, public modalRef: MdbModalRef<SendMessageToAdvisorModalComponent>, private http : HttpClient, private formBuilder:FormBuilder){
this.validationForm = this.formBuilder.group({
  messageContent : ['',[Validators.required, Validators.minLength(1)]],
  messageTitle : ['',[Validators.required, Validators.minLength(1)]]
});
  }

  ngOnInit(){
    var userId = sessionStorage.getItem("userId");
    this.http.get(this.getUserByccIdURL+userId).subscribe((data) => {
      this.userID = (data as any).id;
    })
    this.http.get(this.getSavjetniciURL).subscribe((data) => {
      console.log(data);
      this.savjetnici = data;
      this.userToReceiveID = this.savjetnici[0].id;
    })

  }
  onSubmit(){
var poruka = {
  sadrzaj : this.validationForm.get("messageContent").value,
  procitana  :false ,
  naslov : this.validationForm.get("messageTitle").value,
  korisnikId : this.userID,
  savjetnikId  :this.userToReceiveID
}
this.logService.addLog("Nova poruka za savjetnika!" );
    this.http.post(this.postPorukaURL, poruka).subscribe((data) => {
      console.log(data);
      this.modalRef.close();
    })
  }

  getSelectedUser(e : any){
  console.log(this.userToReceiveID)
  this.userToReceiveID = e.target.value;
  console.log(this.userToReceiveID)
  }


}
