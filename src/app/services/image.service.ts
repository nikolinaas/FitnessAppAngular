import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http  :HttpClient, private userservice: UserService) { }
  private downloadImgUrl = "http://localhost:9000/images/download/";
  slikaId  :any;

  public downloadImage(id: any): string{

    return this.downloadImgUrl + id;
  }
  public GetLoggedInUserImage(id : any) : any{

    return this.downloadImage(id);
   
  }
}
