import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  private getNewsURL : string = "http://localhost:9000/home/news";
  private getExercisesURL : string = "http://localhost:9000/home/exercises";

  constructor(private http:HttpClient){
  
  }


  ngOnInit(){
    this.http.get(this.getNewsURL).subscribe((data) => {
      console.log(data);
    });
  }

}
