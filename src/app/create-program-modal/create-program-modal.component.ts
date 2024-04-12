import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Kategorija } from '../model/Kategorija';

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
   categories : any = [];
   locations : any = [];
  constructor(public modalRef: MdbModalRef<CreateProgramModalComponent>,private modalService: MdbModalService, private http : HttpClient,  private formBuilder:FormBuilder){
    this.validationForm = this.formBuilder.group({
      programName :['',[Validators.required, Validators.minLength(1)]],
  programDescription :['',[Validators.required, Validators.minLength(1)]],
  price:['', [Validators.required, Validators.minLength(1)]],
  duration: ['', [Validators.required, Validators.minLength(1)]],
  difficulty: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit(){

    this.http.get(this.getAllCategories).subscribe((data) => {
      this.categories = <Kategorija[]>JSON.parse(JSON.stringify(data));
    });
    this.http.get(this.getAllLocations).subscribe((data) => {
      this.locations = <any[]>JSON.parse(JSON.stringify(data));
    })

  }

  onSubmit(){

  }
  getSelectedLocation(){

  }
}
