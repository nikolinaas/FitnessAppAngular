import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-send-message-to-user-modal',
  templateUrl: './send-message-to-user-modal.component.html',
  styleUrls: ['./send-message-to-user-modal.component.css']
})
export class SendMessageToUserModalComponent {

  validationForm : any;
  korisnici : any = [];
  getKorisniciURL = "http://localhost:9000/korisnici";
  postPorukaURL = "http://localhost:9000/porukeByKorisnik"
  getUserByccIdURL : string = "http://localhost:9000/korisnici/nalog/";
  userToReceiveID : any;
  userID  :any;
  constructor(private modalService:MdbModalService, public modalRef: MdbModalRef<SendMessageToUserModalComponent>, private http : HttpClient, private formBuilder:FormBuilder){
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
    this.http.get(this.getKorisniciURL).subscribe((data) => {
      console.log(data);
      this.korisnici = data;
      this.userToReceiveID = this.korisnici[0].id;
    })

  }
  onSubmit(){
var poruka = {
  sadrzaj : this.validationForm.get("messageContent").value,
  procitana  :false ,
  naslov : this.validationForm.get("messageTitle").value,
  korisnikPosiljalacId : this.userID,
  korisnikPrimalacId  :this.userToReceiveID
}
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
