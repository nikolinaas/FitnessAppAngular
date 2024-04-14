import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-participate-in-program-modal',
  templateUrl: './participate-in-program-modal.component.html',
  styleUrls: ['./participate-in-program-modal.component.css']
})
export class ParticipateInProgramModalComponent {

  payingMethods : any = [];
  getPayingMethodsURL : string = "http://localhost:9000/payingmethods";
  getPayingMethodByIdURL : string = "http://localhost:9000/payingmethods/";
  postParticipationsURL : string = "http://localhost:9000/participations";
  getUserByccIdURL : string = "http://localhost:9000/korisnici/nalog/";

  selectedPayingMethod : any;
  payingMethodId :any;
  programId : any ;
  isCardPaying : boolean = false;
  isPayPal : boolean = false;
  myGroup : any;
  myGroupPayPal : any;
  constructor(private modalService:MdbModalService, public modalRef: MdbModalRef<ParticipateInProgramModalComponent>, private http : HttpClient){

  }
  ngOnInit(){

   
    this.http.get(this.getPayingMethodsURL).subscribe((data) => {

      this.payingMethods = data;
      this.selectedPayingMethod = this.payingMethods[0];
      console.log(this.selectedPayingMethod.naziv);
      if(this.selectedPayingMethod.naziv == "Karticno"){
        this.payingMethodId = this.selectedPayingMethod.id;
        this.isCardPaying =  true;
      }
    });

  }

  onSubmit(){
    var userId = sessionStorage.getItem("userId");
   

    this.http.get(this.getUserByccIdURL + userId).subscribe((data) => {
console.log((data as any).id);
      var participation = {
        korisnikId : (data as any).id,
        programIdProgram : this.programId,
        nacinPlacanjaIdnacinPlacanja : this.payingMethodId,
        instruktor : false
  
      }
      this.http.post(this.postParticipationsURL,participation).subscribe((data) => {
  
        console.log(data);
      });
  
    });

   
   


  }

  getSelectedPaying(e : any){

    this.payingMethodId= e.target.value;
    this.selectedPayingMethod = e.target.value;
    this.http.get(this.getPayingMethodByIdURL + this.selectedPayingMethod).subscribe((data) => {
      if((data as any).naziv === "Karticno"){
        this.isCardPaying =  true;
        this.isPayPal = false;
      }else  if((data as any).naziv === "PayPal"){
        this.isCardPaying =  false;
      this.isPayPal = true;
      }else{
        this.isCardPaying =  false;
        this.isPayPal = false;
      }
    });
  }
}
