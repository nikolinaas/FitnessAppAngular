import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivityLogService } from '../services/activity-log.service';
import { UserService } from '../services/user.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddActivityModalComponent } from '../add-activity-modal/add-activity-modal.component';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, BarController, CategoryScale } from 'chart.js';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-activity-log-page',
  templateUrl: './activity-log-page.component.html',
  styleUrls: ['./activity-log-page.component.css']
})
export class ActivityLogPageComponent {

  activities : any = [];
  contentTable  : any;
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

  @ViewChild('content', { static: false })
  content!: ElementRef;
  public SavePDF(): void {
  
    const doc = new jspdf.jsPDF();
    const content = this.content.nativeElement;
const contentChart = this.contentChart.nativeElement;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgData2 = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      // doc.addImage(imgData2, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        // doc.addPage();
        // doc.addImage(imgData2, 'PNG', 0, 1, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      this.saveChart();
      doc.save('content.pdf');

 }
   )
  }

  @ViewChild('contentChart', { static: false })
  contentChart!: ElementRef;
  saveChart() : void{

    const doc = new jspdf.jsPDF();
    const contentChart = this.contentChart.nativeElement;

    html2canvas(contentChart).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgData2 = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      // doc.addImage(imgData2, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        // doc.addPage();
        // doc.addImage(imgData2, 'PNG', 0, 1, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      
      doc.save('chart.pdf');
  })}

}
