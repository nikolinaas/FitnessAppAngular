import { Component } from '@angular/core';
import { ActivityLogService } from '../services/activity-log.service';
import { UserService } from '../services/user.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddActivityModalComponent } from '../add-activity-modal/add-activity-modal.component';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, BarController, CategoryScale } from 'chart.js';

@Component({
  selector: 'app-activity-log-page',
  templateUrl: './activity-log-page.component.html',
  styleUrls: ['./activity-log-page.component.css']
})
export class ActivityLogPageComponent {

  activities : any = [];
lineChartOptions: any;
  constructor(private activityService:ActivityLogService,private userservice : UserService, private modalService : MdbModalService){

  }

  ngOnInit(){
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title,BarController,CategoryScale);
    var kilos : any =[];
    var dates : any = [];
    this.userservice.getLogedInUserById().subscribe((data:any)=>{
      this.activities = data.dnevnikAktivnostisById;
      for(let act of this.activities){
        kilos.push(act.brKilograma);
        dates.push(act.datumZapisa.split("T")[0]);
      }
      console.log(kilos);
          })
          var chrt   = <HTMLCanvasElement>document.getElementById(`graph`);
    
          var graph = new Chart(chrt, {
             type: 'line',
             data: {
                labels: dates,
                datasets: [{
                   label: "online tutorial subjects",
                   data: kilos,
                   borderColor : 'black',
                   pointBackgroundColor : 'red',
                }],
             },
             options: {
                responsive: true,
               
             },
          });
    
  }

  addActivity(){
    this.modalService.open(AddActivityModalComponent);
  }
}
