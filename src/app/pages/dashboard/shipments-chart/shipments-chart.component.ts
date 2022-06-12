import { Component, OnInit } from '@angular/core';
import { customTooltips } from '@coreui/chartjs/dist/js/coreui-chartjs.js';
import { TranslateService } from 'ng2-translate';
import { languages } from '../../../shared/shared.data';
import { shipmentsChartData } from './shipments-chart.data';
@Component({
  selector: 'app-shipments-chart',
  templateUrl: './shipments-chart.component.html',
  styleUrls: ['./shipments-chart.component.css']
})
export class ShipmentsChartComponent implements OnInit {

  constructor(private translate:TranslateService) {
    this.barChartLabels = [];
    this.barChartData = shipmentsChartData.barChartData;

    var lang:any = localStorage.getItem("lang");
    if(lang != null)
    {
      this.translate.use(lang) ;
    }
    else{
      this.translate.use(languages[0]);
    }
    
  }

  ngOnInit() {
    
    this.translate.get(shipmentsChartData.barChartLabels).subscribe(res => {
      for(var i=0;i<shipmentsChartData.barChartLabels.length;i++)
      {
        this.barChartLabels.push(res[shipmentsChartData.barChartLabels[i]]);
      }
    });
  }
  
  public barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,
      custom: customTooltips,
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: this.getMax(),
          stepSize: this.getMax() / 2,
          suggestedMin: 0,
          suggestedMax: this.getMax
        }
      }]
    },
  };
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData: any[];
  getMax()
  {
    if(shipmentsChartData.barChartData != undefined)
    {
      var max = 0;
      shipmentsChartData.barChartData[0].data.forEach(function(element) {
        if(max < element)
        {
          max = element;
        }
      });
      if(max > 100)
      {
        max = Math.floor(max / 100 + 1) * 100;
      }
      else if(max > 10)
      {
        max = Math.floor(max / 10 + 1) * 10;
      }
      else{
        max = 10;
      }
      return max;
    }
    return 0;
    
  }
}
