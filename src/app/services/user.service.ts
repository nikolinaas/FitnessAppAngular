import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUserByAaccIdURL = "http://localhost:9000/korisnici/nalog/";
  constructor(private http :  HttpClient) { }

  getLogedInUserById() : any{
    var userId = sessionStorage.getItem("userId");
    return this.http.get(this.getUserByAaccIdURL + userId).pipe((data) => {
      return data;
    })
  }
}
