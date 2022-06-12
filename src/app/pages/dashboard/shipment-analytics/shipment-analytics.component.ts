import { Component, OnInit } from '@angular/core';
import { shipmentData } from './shipment-analytics.data';
import {TranslateService} from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';

@Component({
  selector: 'app-shipment-analytics',
  templateUrl: './shipment-analytics.component.html',
  styleUrls: ['./shipment-analytics.component.css']
})
export class ShipmentAnalyticsComponent implements OnInit {

  constructor(private translate:TranslateService) {
    var lang:any = localStorage.getItem("lang");
    if(lang != null)
    {
      translate.use(lang);
    }
    else{
      translate.use(languages[0]);
    }
   }

  ngOnInit(): void {
  }
  // options
  public options = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log(data);
          var doughnutChartLabels: string[] = [
            'Failed Attempt',
            'Exception',
            'In Transit',
            'Out For Delivery',
            'Delivered'
          ]; console.log(data);
          return doughnutChartLabels[tooltipItem.index] + ": " + data.datasets[0].data[tooltipItem.index];
        }
      }
    }
  };
  public datasets: any = [
    {
      data: shipmentData,
      backgroundColor: ['#f9d408', '#f36e6d', '#81bce6', '#94d8dd', '#89cb74']
    }
  ];
  public doughnutChartType = 'doughnut';
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public getTotalShipment() {
    var result = 0;
    for (var i = 0; i < this.datasets[0].data.length; i++) {
      result += this.datasets[0].data[i];
    }
    return result;
  }
  public getPercent(index: number) {
    var total = this.getTotalShipment();
    var percent = Math.round(this.datasets[0].data[index] * 100 / total);
    return percent;
  }
  public getShipment(index: number) {
    return this.datasets[0].data[index];
  }
}
