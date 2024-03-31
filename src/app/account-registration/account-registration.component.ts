import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})
export class AccountRegistrationComponent {
  formData: any = {};
  public createAccountForm : FormGroup = new FormGroup({});
  
  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
    });
  }
  constructor(private formBuilder: FormBuilder, private router: Router) {

  }

  createAccount(){
 
 
    this.router.navigate(['/home']);
  }

}
