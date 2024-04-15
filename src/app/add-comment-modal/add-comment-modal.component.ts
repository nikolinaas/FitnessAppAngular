import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.css']
})
export class AddCommentModalComponent {

  validationForm : any;
  submitted : boolean = false;
  programId : any;
  userId : any ;
  data : any;
  datas : any;
  postCommentURL : string = "http://localhost:9000/pitanja";
  constructor(public modalRef: MdbModalRef<AddCommentModalComponent>,private modalService: MdbModalService, private http : HttpClient, private formBuilder:FormBuilder){
    this.validationForm = this.formBuilder.group({
      commentContent : ['',[Validators.required, Validators.minLength(1)]]
     })
  }

  ngOnInit(){
    console.log(this.datas.programId);
    console.log(this.datas.userId);
  }
  onSubmit(){
    var comment = {
      tekstPitanja : this.validationForm.get('commentContent')?.value,
      korisnikId : this.datas.userId,
      programIdProgram : this.datas.programId
    }
this.http.post(this.postCommentURL,comment).subscribe((data1) => {
  console.log(data1);
})
  }

}
