import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Program } from '../model/Program';

@Component({
  selector: 'app-show-program-details-modal',
  templateUrl: './show-program-details-modal.component.html',
  styleUrls: ['./show-program-details-modal.component.css']
})
export class ShowProgramDetailsModalComponent {

  program : any;
  uzivo : any = "UŽIVO";
  online : any = "ONLINE";
   programId : any;
   slika : any;
  private downloadImgUrl = "http://localhost:9000/images/download/";
   private getProgramByIdURL :string  = "http://localhost:9000/programs/";
  constructor(private modalService: MdbModalService,private router: Router,private http:HttpClient,private route: ActivatedRoute){
    
  }
  ngOnInit(){
    this.programId = this.route.snapshot.paramMap.get('id');
    this.http.get(this.getProgramByIdURL+this.programId).subscribe((data) => {
      this.program = data;
     // console.log(this.program.slikaId);
      this.slika = this.downloadImage(this.program.slikaId);
      console.log(this.slika);
    })

   
  }
  public downloadImage(id  :any): string{

    return this.downloadImgUrl + id;
  }

}
