import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CheckActivationcodeModalComponent } from '../check-activationcode-modal/check-activationcode-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Nalog } from '../model/Nalog';
import {NgAlertBoxComponent, NgAlertBoxService} from "ng-alert-box-popup";
import swal from 'sweetalert2';
import { LogService } from '../services/log.service';

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
private getUserByAccountIdURL :string = "http://localhost:9000/korisnici/nalog/";
private editAccountURL : string = "http://localhost:9000/nalozi/";
private sendEmailURL:string = "http://localhost:9000/api/mail/send";
private idOfPage : any;

  constructor(private logService: LogService, private alerts: NgAlertBoxService,private router: Router,private modalService: MdbModalService,private formBuilder:FormBuilder,private http:HttpClient,private route: ActivatedRoute) {
    this.validationForm = this.formBuilder.group({
      username :['',[Validators.required, Validators.minLength(1)]],
      password :['',[Validators.required, Validators.minLength(1)]]})

  }

  ngOnInit(){
    this.idOfPage = this.route.snapshot.paramMap.get('id');
   
  }
  createAccountClick(){
    this.router.navigate(['/registration']);
  }

  goToHomePage(){
    this.router.navigate(['/home']);
  }

  showSuccessAlert(msg : string) {
    swal("",msg, "success");
}

  showErrorAlert(msg : string){ 
    swal("Greška",msg,"error");

}

showInfoAlert(msg  :string){
  swal("", msg , "info");
}


  randomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 16; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
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
            sessionStorage.setItem("isLoggedIn",'true');
            sessionStorage.setItem("userId", (data as any).id);
            this.router.navigate(['/home']);
            this.logService.addLog("Uspjesna prijava na nalog korisnika" + this.nalog.korisnickoIme);
          }else{
            if(this.idOfPage==1){
              this.modalService.open(CheckActivationcodeModalComponent,{ data: { id: this.nalog.id }});
            }else{
              this.http.get(this.getUserByAccountIdURL+this.nalog.id).subscribe((kor) => {
                console.log(kor);
                var actCode : any = this.randomString();
              
                this.nalog = {
                  id:(data as any).id,
                  korisnickoIme : (data as any).korisnickoIme,
                  lozinka : (data as any).lozinka,
                  aktiviran : (data as any).aktiviran,
                  aktivacioniKod : actCode
                };
                (kor as any).aktivacioniKod = actCode;
                this.http.put(this.editAccountURL+this.nalog.id,this.nalog).subscribe((n)=>{});
                this.http.post(this.sendEmailURL,kor).subscribe((m)=>{
                });
              } )
              this.showInfoAlert("Nalog nije aktiviran,na e-mail Vam je poslan novi kod za aktivaciju naloga!")
              this.modalService.open(CheckActivationcodeModalComponent,{ data: { id: this.nalog.id }});
            }
            
          }
        }
   
        
       
       else {this.showErrorAlert("Prijava nije moguća, nalog sa navedenim kredencijalima ne postoji!");
       this.logService.addLog("Neuspjesan pokusaj prijave!" );
      }
      })
  
  
    }
   
  }
}
