import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CheckActivationcodeModalComponent } from '../check-activationcode-modal/check-activationcode-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Nalog } from '../model/Nalog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  modalRef: MdbModalRef<CheckActivationcodeModalComponent> | null = null;
  validationForm!: FormGroup;
submitted: boolean = false;
private  nalog : Nalog | undefined;
private logInUserURL :string = "http://localhost:9000/nalozi/login";

  constructor(private router: Router,private modalService: MdbModalService,private formBuilder:FormBuilder,private http:HttpClient) {
    this.validationForm = this.formBuilder.group({
      username :['',[Validators.required, Validators.minLength(1)]],
      password :['',[Validators.required, Validators.minLength(1)]]})

  }

  createAccountClick(){
    this.router.navigate(['/registration']);
  }

  goToHomePage(){
    this.router.navigate(['/home']);
  }

  async logIn(loginRequest : any) {
    
    
  }
 submit(){
    
    if(!this.validationForm.invalid){
      var logInRequest : any = {
        korisnickoIme :  this.validationForm.get( 'username')?.value,
        lozinka : this.validationForm.get( 'password')?.value
      }
    
  
      this.http.post(this.logInUserURL, logInRequest).subscribe((data)=> { 
        if(data!==null){

          this.nalog = {
            id:(data as any).id,
            korisnickoIme : (data as any).korisnickoIme,
            lozinka : (data as any).lozinka,
            aktiviran : (data as any).aktiviran,
            aktivacioniKod : (data as any).aktivacioniKod
          };
    
          if(this.nalog.aktiviran){
            this.router.navigate(['/home']);
          }else{
            this.modalService.open(CheckActivationcodeModalComponent,{ data: { id: this.nalog.id }});
          }
        }
   
        
        
       else alert("Prijava nije moguca, nalog nije kreiran!");
      })
  
  
    }
   
  }
}
