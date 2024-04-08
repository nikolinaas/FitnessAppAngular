import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-show-exercise-details-modal',
  templateUrl: './show-exercise-details-modal.component.html',
  styleUrls: ['./show-exercise-details-modal.component.css']
})
export class ShowExerciseDetailsModalComponent {

  exercise : any;

  constructor(public modalRef: MdbModalRef<ShowExerciseDetailsModalComponent>,private modalService: MdbModalService){
    
  }
}
