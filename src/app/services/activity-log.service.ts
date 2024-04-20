import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  private ActivityLogURL : string = "http://localhost:9000/dnevnikaktivnosti";
  constructor(private http:HttpClient, private userservice:UserService) { }

 postActivitiesLoggedUser(data  :any){
this.http.post(this.ActivityLogURL,data).subscribe((data) => {

})
   
  }
}
