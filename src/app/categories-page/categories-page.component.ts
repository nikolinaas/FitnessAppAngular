import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent {

  categories  :any = [];
  myGroup : any;
  myCategories : any = [];
  userID : any;
  getCategoriesURL : string = "http://localhost:9000/kategorije";
 postSubscribtionsURL : string = "http://localhost:9000/pretplate";
  getMySubscribtionsByIdURL : string = "http://localhost:9000/pretplate/kategorijeByUser/";
  getUserByccIdURL : string = "http://localhost:9000/korisnici/nalog/";

  constructor(private http : HttpClient, private route: ActivatedRoute,private router: Router){}

  ngOnInit(){
    this.http.get(this.getCategoriesURL).subscribe((data) => {
      this.categories= data;
    })
    var userId = sessionStorage.getItem("userId");
     this.http.get(this.getUserByccIdURL+userId).subscribe((data1) => {
      this.userID = (data1 as any).id;
      this.http.get(this.getMySubscribtionsByIdURL+(data1 as any).id).subscribe((data) =>
      {
        this.myCategories = data;
      })
    })
   
  }

  subscribeToCategory(catId : any){

    console.log(catId)
    var subscribtion = {
      kategorijaIdkategorija : catId,
      korisnikId  :this.userID
    }

    this.http.post(this.postSubscribtionsURL, subscribtion).subscribe((data) => {
      window.location.reload
    })
  }
}
