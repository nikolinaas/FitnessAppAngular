import { HttpClient } from '@angular/common/http';
import { Component, NgIterable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-show-programs-messages',
  templateUrl: './show-programs-messages.component.html',
  styleUrls: ['./show-programs-messages.component.css']
})
export class ShowProgramsMessagesComponent {

  getQuestionsByProgramIdURL : string = "http://localhost:9000/pitanja/program/";
  getAnswerByQuestionIdURL : string = "http://localhost:9000/odgovori/pitanje/";
  getUserByccIdURL : string = "http://localhost:9000/korisnici/nalog/";
  postCommentReplyURL : string = "http://localhost:9000/odgovori";
  messages : any = [];
  myGroup : any;
  constructor(private http : HttpClient, private route: ActivatedRoute,private router: Router,private formBuilder:FormBuilder){
   this.myGroup = this.formBuilder.group({
    commentContent : ['',[Validators.required, Validators.minLength(1)]]
   })
  }

  ngOnInit(){

    var programId = this.route.snapshot.paramMap.get('id');

    this.http.get(this.getQuestionsByProgramIdURL + programId).subscribe((data) => {
this.messages = data
    });
   

  }
 
  onSubmit(id:any){
    var userId = sessionStorage.getItem("userId");
    this.http.get(this.getUserByccIdURL + userId).subscribe((data) => {
      var comment : any = {
        odgovorText : this.myGroup.get( 'commentContent')?.value,
        korisnikId : (data as any).id,
        pitanjeOProgramuId : id
      }
      this.http.post(this.postCommentReplyURL,comment).subscribe((data) => {
        console.log(data);
      })
    });
   window.location.reload();
  }


}
