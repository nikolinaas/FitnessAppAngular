import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})
export class AccountRegistrationComponent {
  formData: any = {};


  validationForm!: FormGroup;
  submitted= false;

  constructor(private router: Router, private formBuilder:FormBuilder) {
   
  }

  
 
onSubmit(){
this.submitted = true;
if(this.validationForm.invalid){
  return;
}
alert("Succses");
}
ngOnInit(){
  this.validationForm = this.formBuilder.group({
    firstName:['', Validators.required]
  })
}
  createAccount(){
 
    this.router.navigate(['/home']);
  }

}
