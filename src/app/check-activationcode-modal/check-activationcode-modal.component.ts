import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-check-activationcode-modal',
  templateUrl: './check-activationcode-modal.component.html',
  styleUrls: ['./check-activationcode-modal.component.css']
})
export class CheckActivationcodeModalComponent {
  validationForm!: FormGroup;
  submitted: boolean = false;
  id: number | null = null;
  private NalogByIdURL : string= "http://localhost:9000/nalozi/"
  constructor(public modalRef: MdbModalRef<CheckActivationcodeModalComponent>,private modalService: MdbModalService,private formBuilder:FormBuilder,private http:HttpClient) {
    this.validationForm = this.formBuilder.group({
      activationCode :['',[Validators.required, Validators.minLength(1)]],
    })

  }

  ngOnInit(){
    console.log(this.id);
  }
  close(){
this.modalRef.close();
  }

  submit(){
    this.http.get(this.NalogByIdURL+this.id).subscribe((data)=>{console.log(data);
      var kod1 : any =this.validationForm.get('activationCode')?.value;
      var kod2 : any = (data as any).aktivacioniKod;
      this.id = (data as any).id;
    if(kod1 == kod2){
      console.log("kod dobar");
      var nalogRequest :any = {
      id: (data as any).id,
      korisnickoIme:(data as any).korisnickoIme,
      lozinka: (data as any).lozinka,
      aktiviran: true,
      aktivacioniKod : null
  
      };
      this.http.put(this.NalogByIdURL+this.id,nalogRequest).subscribe((data) => {console.log(data);})
      this.close();
    }else{
      alert("Unijeli ste neispravan aktivacioni kod! Pokušajte ponovo!");
    }
    });
  }
}
