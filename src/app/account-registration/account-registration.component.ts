import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { KorisnikRequest } from '../model/KorisnikRequest';
import { waitForAsync } from '@angular/core/testing';
import { NalogRequest } from '../model/NalogRequest';
import { Nalog } from '../model/Nalog';


@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})
export class AccountRegistrationComponent {
  formData: any = {};

  private sendEmailURL:string = "http://localhost:9000/api/mail/send";
  private createAccURL : string = "http://localhost:9000/nalozi";
  private createUserURL :string = "http://localhost:9000/korisnici";

  validationForm!: FormGroup;
  submitted= false;

  constructor(private router: Router, private formBuilder:FormBuilder, private http:HttpClient) {
    
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
  randomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 16; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
  ngOnInit(){
   
    
    console.log(this.randomString());
    
  }

onSubmit(){
var aktivKod = this.randomString();
if(!this.validationForm.invalid){
  console.log("validnooooooo");
  this.submitted = true;
  var korisnikRequest : KorisnikRequest;
  var nalogRequest : NalogRequest= {
  korisnickoIme : this.validationForm.get('username')?.value,
  lozinka : this.validationForm.get('password')?.value,
  aktiviran : false,
  aktivacioniKod : aktivKod
  }
 
  var id :number = 0;
  this.http.post(this.createAccURL, nalogRequest).subscribe((data)=> {

    if(data !== null){
      korisnikRequest = {
        ime: this.validationForm.get( 'firstName')?.value,
        prezime: this.validationForm.get( 'lastName')?.value,
        email: this.validationForm.get( 'email')?.value,
        brojTelefona:this.validationForm.get( 'phoneNumber')?.value,
        adresa: this.validationForm.get( 'address')?.value,
        nalogIdnalog :(data as any).id,
        aktivacioniKod : aktivKod
      }
      this.http.post(this.createUserURL, korisnikRequest).subscribe((data) => {});
      this.http.post(this.sendEmailURL, korisnikRequest).subscribe((data)=> {});
      alert("Nalog je kreiran, kreiranje naloga potvrdite na mail-u i aktivirajte nalog!")
    }else{
  
      this.validationForm.get('username')?.setErrors({
        notUnique: true
      });
      alert("Nije moguce kreirati nalog sa vec postojecim korisnicikim imenom!")
    }

  });
  
}else console.log("nije validno");

}

  createAccount(){
 
   
    this.router.navigate(['/home']);
  }

}
