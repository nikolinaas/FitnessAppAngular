import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Novost } from '../model/Novost';

@Component({
  selector: 'app-show-news-details-modal',
  templateUrl: './show-news-details-modal.component.html',
  styleUrls: ['./show-news-details-modal.component.css']
})
export class ShowNewsDetailsModalComponent {

  news : any;

  constructor(public modalRef: MdbModalRef<ShowNewsDetailsModalComponent>,private modalService: MdbModalService){

  }
  ngOnInit(){
    console.log(this.news);
  }
  close(){
    this.modalRef.close();
      }
}
