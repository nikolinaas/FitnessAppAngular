import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Program } from '../model/Program';
import { DomSanitizer } from '@angular/platform-browser';
import { ShowProgramDetailsModalComponent } from '../show-program-details-modal/show-program-details-modal.component';
import { CreateProgramModalComponent } from '../create-program-modal/create-program-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-programs-page',
  templateUrl: './programs-page.component.html',
  styleUrls: ['./programs-page.component.css']
})
export class ProgramsPageComponent {

  programss : any = [];
  searchArray : any = [];
  image : any;
  private getProgramsURL : string = "http://localhost:9000/programs";
  private getImageURL : string = "http://localhost:9000/programs/image/6";
  private downloadImgUrl = "http://localhost:9000/images/download/";
  private uploadImgUrl = "http://localhost:9000/images";
  private categoriesUrl = "http://localhost:9000/kategorije";
  kategorije : any = [];
  programImageUrl: any ;
  inputValue : any = "";
  constructor(private router: Router,private modalService: MdbModalService,private http:HttpClient,private route: ActivatedRoute,private sanitizer: DomSanitizer) {

  }
  
  ngOnInit(){
    this.http.get(this.getProgramsURL).subscribe((data) => {
      this.programss = <Program[]>JSON.parse(JSON.stringify(data));
      this.searchArray = this.programss;


    });
    this.http.get(this.categoriesUrl).subscribe((data) => {
      this.kategorije = <any[]>JSON.parse(JSON.stringify(data));
      


    });
    console.log("bbbbbbbbbbbbb");
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


  createProgramClick(){
    this.modalService.open(CreateProgramModalComponent);
  }

  search(){
    this.programss = [];


  }

  onChange(e  :any){
    console.log(e.target.value)
this.programss = [];
for(let prog of this.searchArray){
 
  if(prog.kategorijaIdkategorija == e.target.value)
  this.programss.push(prog);
}
  }
}
