import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Program } from '../model/Program';
import { ParticipateInProgramModalComponent } from '../participate-in-program-modal/participate-in-program-modal.component';
import { AddCommentModalComponent } from '../add-comment-modal/add-comment-modal.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-show-program-details-modal',
  templateUrl: './show-program-details-modal.component.html',
  styleUrls: ['./show-program-details-modal.component.css']
})
export class ShowProgramDetailsModalComponent {

  instruktori : any = [];
  program : any;
  uzivo : any = "UŽIVO";
  online : any = "ONLINE";
   programId : any;
   slika : any;
   userID  :any ;
   isOnline : boolean = false;
   isMineProgram : boolean = false;
   safeURL : any;
   getUserByccIdURL : string = "http://localhost:9000/korisnici/nalog/";
  private downloadImgUrl = "http://localhost:9000/images/download/";
   private getProgramByIdURL :string  = "http://localhost:9000/programs/";
   getInstruktorsURL = "http://localhost:9000/participations/instruktor/program/";
  constructor(private modalService: MdbModalService,private router: Router,private http:HttpClient,private route: ActivatedRoute,  private _sanitizer: DomSanitizer){
  
  }
  ngOnInit(){
    var userId = sessionStorage.getItem("userId");
   

    
    this.programId = this.route.snapshot.paramMap.get('id');
    this.http.get(this.getProgramByIdURL+this.programId).subscribe((data) => {
      this.program = data;
      this.isOnline = this.program.online;
      this.http.get(this.getUserByccIdURL + userId).subscribe((data) => {
        this.userID = (data as any).id;
       
        if((data as any).id){

        }
      });
      this.slika = this.downloadImage(this.program.slikaId);
      console.log(this.slika);
    })

this.http.get(this.getInstruktorsURL + this.programId).subscribe((data) => {
  this.instruktori = data;
})
   
  }
  public downloadImage(id  :any): string{

    return this.downloadImgUrl + id;
  }

  participateInProgram(){
    this.modalService.open(ParticipateInProgramModalComponent,{ data: { programId: this.programId }});
  }
  showProgramsMessages(){
    this.router.navigate(['programs/messages/',this.programId]);
  }
  addComment(){
   

      var datas = {
        programId : this.programId,
        userId : this.userID
      }
      this.modalService.open(AddCommentModalComponent, {data : { datas: datas} });

    

    
  }

  getUrl(videoURL : any) : any{
    videoURL = videoURL.replace("watch?v=", "embed/");
    return this._sanitizer.bypassSecurityTrustResourceUrl(videoURL );
   
  }
}
