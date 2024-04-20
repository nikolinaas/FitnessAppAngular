import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Kategorija } from '../model/Kategorija';
import { Observable } from 'rxjs';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-create-program-modal',
  templateUrl: './create-program-modal.component.html',
  styleUrls: ['./create-program-modal.component.css']
})
export class CreateProgramModalComponent {

  validationForm!: FormGroup;
  submitted : boolean = false;
  getAllCategories  : string = "http://localhost:9000/kategorije";
  getAllLocations : string = "http://localhost:9000/lokacije";
  private uploadImgUrl = "http://localhost:9000/images/upload";
  postProgramURL : string = "http://localhost:9000/programs"
   categories : any = [];
   locations : any = [];
   file : any;
   locationId : any ;
   categoryId : any;
   isOnline : boolean = false;
   isLive : boolean = false;
  constructor(private logService:LogService, public modalRef: MdbModalRef<CreateProgramModalComponent>,private modalService: MdbModalService, private http : HttpClient,  private formBuilder:FormBuilder){
  this.validationForm = this.formBuilder.group({
  programName :['',[Validators.required, Validators.minLength(1)]],
  programDescription :['',[Validators.required, Validators.minLength(1)]],
  price:['', [Validators.required, Validators.minLength(1)]],
  duration: ['', [Validators.required, Validators.minLength(1)]],
  difficulty: ['', [Validators.required, Validators.minLength(1)]],
  video: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit(){

    this.http.get(this.getAllCategories).subscribe((data) => {
      console.log(data);
      this.categories = <Kategorija[]>JSON.parse(JSON.stringify(data));
      this.categoryId = this.categories[0].idkategorija;
    });
    this.http.get(this.getAllLocations).subscribe((data) => {
      this.locations = <any[]>JSON.parse(JSON.stringify(data));
      this.locationId = this.locations[0].id;
    })


  }

  onSubmit(){

    
    if(this.file){
     this.uploadImage(this.file).subscribe((data) => {
       var  program  = {
        opis : this.validationForm.get( 'programDescription')?.value,
        cijena : this.validationForm.get( 'price')?.value,
        nivoTezine : this.validationForm.get( 'difficulty')?.value,
        trajanje : this.validationForm.get( 'duration')?.value,
        lokacijaOdrzavanjaIdlokacijaOdrzavanja : this.locationId,
        kategorijaIdkategorija : this.categoryId ,
        slikaId : (data as any).id,
        online : this.isOnline,
        uzivo : this.isLive,
        nazivPrograma : this.validationForm.get( 'programName')?.value,
        video : this.validationForm.get( 'video')?.value
        }
        this.logService.addLog("Kreiranje novog programa!" + this.validationForm.get( 'programName')?.value );
        this.http.post(this.postProgramURL,program).subscribe((data) => {
          console.log(data);
        })
       
       console.log(program);

     })
    }
  }
  getSelectedLocation(e : any){
this.locationId = e.target.value;
    console.log(e.target.value);

  }
  getSelectedCategory(e : any){
this.categoryId = e.target.value;
console.log(this.categoryId)
  }

  onFileUpload(event: any) {
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
    }
    console.log(this.file);
  }

  public uploadImage(url: any): Observable<any> {
    const formData = new FormData();
    formData.append("image", url);
    return this.http.post(this.uploadImgUrl, formData);
  }

  onItemChangeIsOnline(target : any){
    if(target.value)
   { this.isOnline = true;
    this.isLive = false;}
    console.log(this.isOnline);
  }

  onItemChangeIsLive(target : any){
    if(target.value){
      this.isLive = true;
      this.isOnline = false;
    }

  }
}
