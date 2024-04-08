import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Novost } from '../model/Novost';
import { Vjezba } from '../model/Vjezba';
import { ShowNewsDetailsModalComponent } from '../show-news-details-modal/show-news-details-modal.component';
import { ShowExerciseDetailsModalComponent } from '../show-exercise-details-modal/show-exercise-details-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  private getNewsURL : string = "http://localhost:9000/home/news";
  private getExercisesURL : string = "http://localhost:9000/home/exercises";

   news :any = [];
   exercises : any = [];
   constructor(private http:HttpClient, private modalService: MdbModalService){
  
     

  }


  ngOnInit(){
    this.http.get(this.getNewsURL).subscribe((data) => {
    
  
     this.news = <Novost[]>JSON.parse(JSON.stringify(data));
console.log(this.news[0]);
      
  
    });

    this.http.get(this.getExercisesURL).subscribe((data) => {

      this.exercises = <Vjezba[]>JSON.parse(JSON.stringify(data));
      console.log(this.exercises);

    });
  }

  showNewsDetails(novost : any) {

    console.log("kliiiiiiiiiiiiik")
    this.modalService.open(ShowNewsDetailsModalComponent, { data: { news: novost }});
  }

  showExerciseDetails(vjezba : any){
    this.modalService.open(ShowExerciseDetailsModalComponent,{ data : { exercise : vjezba}});
  }
}
