import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { languages } from '../../shared/shared.data';
import {  ordersData } from './orders-data';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild("asideToggle", {static: false}) asideToggle: ElementRef;
  @ViewChild("fileupload", {static: false}) fileUpload: ElementRef;
  file:File = null;
  fileName:any = "";

  tableData = ordersData;
  currentPage = 1;
  page: number = 10;

  asideShow:any = false;

  allCheck:any = false;
  
  filterStatus:string = "";
  filterOrderReference:string = "";
  filterTrackingID:string = "";
  filterCreationDate:any = null;
  filterRecipient:string = "";

  ordersDate:any = "12-09-2020";

  currentOrders:any = null;

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
  changeAllCheck()
  {
    var checked = this.allCheck;
    var filteredData = this.getFilteredData;
    filteredData.forEach(function(row){
      row.checked = checked;
    });
  }
  pageChanged(event: PageChangedEvent): void {
  }
  get getFilteredPageData()
  {
    var filteredData = this.tableData.filter(inbound=>
      inbound.status.indexOf(this.filterStatus) > -1 &&
      inbound.orderReference.indexOf(this.filterOrderReference) > -1 &&
      inbound.trackingID.toLowerCase().indexOf(this.filterTrackingID.toLowerCase()) > -1 &&
      (this.filterCreationDate != null?
      (Date.parse(inbound.creationDate) >= this.filterCreationDate[0] 
      && Date.parse(inbound.creationDate) <= this.filterCreationDate[1]):true) &&
      inbound.recipient.toLowerCase().indexOf(this.filterRecipient.toLowerCase()) > -1 
    );
    const startItem = (this.currentPage - 1) * this.page;
    const endItem = this.currentPage * this.page;
    return filteredData.slice(startItem, endItem);
  }
  get getFilteredData()
  {
    var filteredData = this.tableData.filter(inbound=>
      inbound.status.indexOf(this.filterStatus) > -1 &&
      inbound.orderReference.indexOf(this.filterOrderReference) > -1 &&
      inbound.trackingID.toLowerCase().indexOf(this.filterTrackingID.toLowerCase()) > -1 &&
      (this.filterCreationDate != null?
      (Date.parse(inbound.creationDate) >= this.filterCreationDate[0] 
      && Date.parse(inbound.creationDate) <= this.filterCreationDate[1]):true) &&
      inbound.recipient.toLowerCase().indexOf(this.filterRecipient.toLowerCase()) > -1 
    );
    return filteredData;
  }
  search()
  {

  }
  reset()
  {
    this.filterStatus = "";
    this.filterOrderReference = "";
    this.filterCreationDate = null;
    this.filterRecipient = "";
    this.filterTrackingID = "";
  }
  export()
  {
    var content = "STATUS\tORDER REFERENCE\tTRACKING ID\tCREATION DATE\tRECIPIENT\tCOUNTRY\tDELIVERY MODE\tOPTIONS\n";
    this.tableData.filter(a=>a.checked).forEach(function(row){
      content+=""+row.status+"\t"+row.orderReference+"\t"+row.trackingID+"\t"+row.creationDate+"\t"+row.recipient+"\n";
    });
    var filename = this.ordersDate+".txt";

    this.download(filename,content);
  }
  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  showMoreDetails(orders:any)
  {
    this.currentOrders = orders;
    this.toggleAside();
  }
  confirmEdit()
  {
    this.toggleAside();
  }
  toggleAside()
  {
    this.asideShow =  !this.asideShow;
    this.asideToggle.nativeElement.click();
  }
  getBadge(status) {
    switch (status) {
      case 'Delivered':
      case 'In delivering':
        return 'success';
      case 'Created':
        return 'secondary';
      case 'in fulfillment':
      case 'In transit':
        return 'info';
      case 'Exception':
        return 'warning';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
    }
  }
  public handleFileInput(files:any)
  {
    this.file= files[0];   
    this.fileName = this.file.name;  
  }
}
