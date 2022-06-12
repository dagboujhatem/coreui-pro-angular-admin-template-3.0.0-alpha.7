import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';
import{trackData, shipmentContents} from './details.data';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() activeTab: any;
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
  trackData: any = trackData;
  shipmentContents: any = shipmentContents;
}
