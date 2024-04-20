import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private postLogUrl = "http://localhost:9000/logovi";
  constructor(private htttp:HttpClient,private datePipe: DatePipe) { }

  addLog(info : any){
    var date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm:ss.SSS');
    var data = {
      info : info,
      datum : date

    }
this.htttp.post(this.postLogUrl, data).subscribe((data) => {
  console.log(data);
})

  }
}
