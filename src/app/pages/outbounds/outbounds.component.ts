import { Component, OnInit, Input } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { outboundsData } from './outbounds-data';
import { Moment } from 'moment';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../shared/shared.data';

@Component({
  selector: 'app-outbounds',
  templateUrl: './outbounds.component.html',
  styleUrls: ['./outbounds.component.scss']
})
export class OutboundsComponent implements OnInit {
  @Input() shipment_id: string;
  @Input() created_on: string;
  @Input() items_sent: number;
  @Input() items_received: number;
  @Input() status: string;
  @Input() index: number;
  tableData = outboundsData;
  selected: { startDate: Moment, endDate: Moment };
  currentPage = 1;
  page: number = 10;

  filterID: string = "";
  filterStatus: string = "";
  filterDate: any = null;

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

  pageChanged(event: PageChangedEvent): void {
  }
  get getFilteredPageData() {
    var filteredData = this.tableData.filter(inbound =>
      inbound.shipment_id.toLowerCase().indexOf(this.filterID.toLowerCase()) > -1 &&
      inbound.status.indexOf(this.filterStatus) > -1 &&
      (this.filterDate != null ?
        (Date.parse(inbound.created_on) >= this.filterDate[0]
          && Date.parse(inbound.created_on) <= this.filterDate[1]) : true)
    );
    const startItem = (this.currentPage - 1) * this.page;
    const endItem = this.currentPage * this.page;
    return filteredData.slice(startItem, endItem);
  }
  get getFilteredData() {
    return this.tableData.filter(inbound =>
      inbound.shipment_id.toLowerCase().indexOf(this.filterID.toLowerCase()) > -1 &&
      inbound.status.indexOf(this.filterStatus) > -1 &&
      (this.filterDate != null ?
        (Date.parse(inbound.created_on) >= this.filterDate[0]
          && Date.parse(inbound.created_on) <= this.filterDate[1]) : true)
    );
  }
  getBadge(status) {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Created':
        return 'secondary';
      case 'Pending':
        return 'warning';
      case 'Receiving':
        return 'info';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
    }
  }
  search() {

  }
  reset() {
    this.filterID = "";
    this.filterStatus = "";
    this.filterDate = null;
  }
}
