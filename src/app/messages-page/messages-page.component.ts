import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SendMessageToAdvisorModalComponent } from '../send-message-to-advisor-modal/send-message-to-advisor-modal.component';
import { SendMessageToUserModalComponent } from '../send-message-to-user-modal/send-message-to-user-modal.component';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})
export class MessagesPageComponent {

  getUserMessagesReceived : string  = "http://localhost:9000/porukeByKorisnik/primalac/";
  getUserByccIdURL : string = "http://localhost:9000/korisnici/nalog/";
  userId : any;
  messages : any = [];

 constructor(private modalService:MdbModalService, private http : HttpClient){

  }


  ngOnInit(){

    var userId = sessionStorage.getItem("userId");
   

    this.http.get(this.getUserByccIdURL + userId).subscribe((data) => {

      this.userId = (data as any).id;

      this.http.get(this.getUserMessagesReceived+this.userId).subscribe((data) => {
        this.messages = data;
      })
})

  }

  sendMessageToAdvisor(){
this.modalService.open(SendMessageToAdvisorModalComponent);
  }

  sendmessageToUser(){
    this.modalService.open(SendMessageToUserModalComponent);
    
  }
}
