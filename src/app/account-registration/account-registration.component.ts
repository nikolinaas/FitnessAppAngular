import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { KorisnikRequest } from '../model/KorisnikRequest';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})
export class AccountRegistrationComponent {
  formData: any = {};
  firstName=new FormControl(['', Validators.required]);
  lastName = new FormControl(['', Validators.required]);
  email = new FormControl(['', Validators.required, Validators.email]);
  phoneNumber= new FormControl(['', Validators.required]);
  address= new FormControl(['', Validators.required]);
  username= new FormControl(['', Validators.required]);
  password= new FormControl(['', Validators.required]);
  private sendEmailURL:string = "http://localhost:9000/api/mail/send"

  validationForm!: FormGroup;
  submitted= false;

  constructor(private router: Router, private formBuilder:FormBuilder, private http:HttpClient) {
    
      this.validationForm = this.formBuilder.group({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address: this.address,
        username: this.username,
        password: this.password
      })
    
  }

  
 
onSubmit(){

var korisnikRequest : KorisnikRequest = {
    ime: this.validationForm.get( 'firstName')?.value,
    prezime: this.validationForm.get( 'lastName')?.value,
    email: this.validationForm.get( 'email')?.value,
    brojTelefona:this.validationForm.get( 'phoneNumber')?.value,
    adresa: this.validationForm.get( 'address')?.value,
}
this.submitted = true;
if(this.validationForm.invalid){
  console.log(korisnikRequest);
  this.http.post(this.sendEmailURL, korisnikRequest).subscribe((data)=> {});
}
alert("Succses");
}

  createAccount(){
 
   
    this.router.navigate(['/home']);
  }

}
