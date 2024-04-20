import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {

  submitted : boolean = false;
  validationForm : any;
  user  :any ;
  file  :any;
  private downloadImgUrl = "http://localhost:9000/images/download/";
  private putUserURL = "http://localhost:9000/korisnici/";
  private putAccountURL = "http://localhost:9000/nalozi/";
  imagechanged : boolean = false;
  private uploadImgUrl = "http://localhost:9000/images/upload";
  constructor(private logService:LogService, private formBuilder : FormBuilder , private userService : UserService, private http  :HttpClient){
      this.validationForm = this.formBuilder.group({
        firstName :['',[Validators.required, Validators.minLength(1)]],
        lastName :['',[Validators.required, Validators.minLength(1)]],
        email:['', [Validators.required, Validators.minLength(1), Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(1)]],
        address: ['', [Validators.required, Validators.minLength(1)]],
        username:['', [Validators.required, Validators.minLength(1)]],
        password:['', [Validators.required, Validators.minLength(1)]]
      })
    
  }

  ngOnInit(){
    
   this.userService.getLogedInUserById().subscribe((data  :any) => {
    console.log(data)
    this.user = data;
    this.validationForm = this.formBuilder.group({
      firstName :[data.ime,[Validators.required, Validators.minLength(1)]],
      lastName :[data.prezime,[Validators.required, Validators.minLength(1)]],
      email:[data.email, [Validators.required, Validators.minLength(1), Validators.email]],
      phoneNumber: [data.brojTelefona, [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(1)]],
      address: [data.adresa, [Validators.required, Validators.minLength(1)]],
      username:[data.nalogKorisnickoIme, [Validators.required, Validators.minLength(1)]],
      password:[data.nalogLozinka, [Validators.required, Validators.minLength(1)]]
    })
    this.validationForm.controls['username'].disable();
   })
    
  }
onSubmit(){
  
  if(this.file){
    this.uploadImage(this.file).subscribe((dataSlika : any) => {
      var korisnikRequest  = {
        ime: this.validationForm.get( 'firstName')?.value,
        prezime: this.validationForm.get( 'lastName')?.value,
        email: this.validationForm.get( 'email')?.value,
        brojTelefona:this.validationForm.get( 'phoneNumber')?.value,
        adresa: this.validationForm.get( 'address')?.value,
        slikaId : dataSlika.id,
        nalogIdnalog : this.user.nalogIdnalog,
        aktivacioniKod: ''
        
      }
      this.http.put(this.putUserURL + this.user.id, korisnikRequest).subscribe((data)=>{
        var nalogRequest = {
          korisnickoIme : this.user.nalogKorisnickoIme,
          lozinka :this.validationForm.get( 'password')?.value,
          aktiviran : this.user.nalogAktiviran,
          aktivacioniKod : ""
        }
      
      
        this.http.put(this.putAccountURL + this.user.nalogIdnalog, nalogRequest).subscribe((data) => {
      window.location.reload()
        });
      })
    })
  }else{
   var  korisnikRequest = {
      ime: this.validationForm.get( 'firstName')?.value,
      prezime: this.validationForm.get( 'lastName')?.value,
      brojTelefona:this.validationForm.get( 'phoneNumber')?.value,
      email: this.validationForm.get( 'email')?.value,
     
      adresa: this.validationForm.get( 'address')?.value,
      slikaId : this.user.slikaId,
      nalogIdnalog : this.user.nalogIdnalog,
      aktivacioniKod: ""
      
    }
    this.http.put(this.putUserURL + this.user.id, korisnikRequest).subscribe((data)=>{
      var nalogRequest = {
        korisnickoIme : this.user.nalogKorisnickoIme,
        lozinka :this.validationForm.get( 'password')?.value,
        aktiviran : this.user.nalogAktiviran,
        aktivacioniKod : ""
      }
    
      this.logService.addLog("Izmjena podataka naloga!" + this.user.ime );
      this.http.put(this.putAccountURL + this.user.nalogIdnalog, nalogRequest).subscribe((data) => {
    window.location.reload()
      });
    })
  }
 

}
public GetImage(id : any) : any{
  let image = this.downloadImage(id);
  return image;
}
public downloadImage(id: any): string{

  return this.downloadImgUrl + id;
}
onFileUpload(event  :any){
  if(event.target.files.length > 0){
    this.file = event.target.files[0];
  }
  this.imagechanged = true;
  console.log(this.file);
}

public uploadImage(url: any): Observable<any> {
  const formData = new FormData();
  formData.append("image", url);
  return this.http.post(this.uploadImgUrl, formData);
}
}
