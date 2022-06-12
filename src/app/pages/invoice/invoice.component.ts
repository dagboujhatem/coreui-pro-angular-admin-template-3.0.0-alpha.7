import { Component, OnInit} from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { languages } from '../../shared/shared.data';
import {  invoiceData } from './invoice-data';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  tableData = invoiceData;
  currentPage = 1;
  page: number = 10;

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
  get getFilteredPageData()
  {
    var filteredData = this.tableData;
    const startItem = (this.currentPage - 1) * this.page;
    const endItem = this.currentPage * this.page;
    return filteredData.slice(startItem, endItem);
  }
  get getFilteredData()
  {
    var filteredData = this.tableData;
    return filteredData;
  }
}
