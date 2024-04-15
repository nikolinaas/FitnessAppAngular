import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrls: ['./my-programs.component.css']
})
export class MyProgramsComponent {
  programsActive : any = [];
  programsUnctive : any = [];
  userID : any;
  getProgramsActiveByUserId : string = "http://localhost:9000/participations/programiAktivni/";
  getProgramsUnActiveByUserId : string = "http://localhost:9000/participations/programiNeaktivni/";
  getUserByccIdURL : string = "http://localhost:9000/korisnici/nalog/";
  getParticipationByProgIdURL : string = "http://localhost:9000/participations/program/";
  putParticipationsURL : string = "http://localhost:9000/participations/";
  private downloadImgUrl = "http://localhost:9000/images/download/";

  constructor(private router: Router,private modalService: MdbModalService,private http:HttpClient,private route: ActivatedRoute){

  }
  ngOnInit(){

     var userId =  sessionStorage.getItem("userId");

    this.http.get(this.getUserByccIdURL+userId).subscribe((data) => {
this.userID = (data as any).id;
      this.http.get(this.getProgramsActiveByUserId+(data as any).id).subscribe((data1) =>
      {
        this.programsActive = data1;
      });
      this.http.get(this.getProgramsUnActiveByUserId+(data as any).id).subscribe((data1) =>
      {
        this.programsUnctive = data1;
      });

    })


  }
  public GetImage(id : any) : any{
    let image = this.downloadImage(id);
    return image;
  }
  public downloadImage(id: any): string{

    return this.downloadImgUrl + id;
  }
  showProgramDetails(program : any){
    var id : any = program.id
    this.router.navigate(['/programs',program.id]);
  }
  deactivateProgram(programId : any){
    
    this.http.get(this.getParticipationByProgIdURL+programId + "/" + this.userID).subscribe((data) => {
      var participation = {
        korisnikId: (data as any)?.korisnikId,
        programIdProgram: (data as any).programIdProgram,
        nacinPlacanjaIdnacinPlacanja:(data as any).nacinPlacanjaIdnacinPlacanja ,
       
        instruktor: (data as any).instruktor,
        aktivno: false
      }
      this.http.put(this.putParticipationsURL+(data as any).id, participation).subscribe((data) => {
        window.location.reload();
      })
    });

  
  }

}
