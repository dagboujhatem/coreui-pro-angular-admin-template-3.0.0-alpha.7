import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { languages } from '../../shared/shared.data';
import {  returnsData } from './returns-data';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {
  @ViewChild("asideToggle", {static: false}) asideToggle: ElementRef;
  @ViewChild("fileupload", {static: false}) fileUpload: ElementRef;
  file:File = null;
  fileName:any = "";

  allCheck:any = false;

  tableData = returnsData;
  currentPage = 1;
  page: number = 10;

  asideShow :any = false;

  filterStatus:string = "";
  filterOrderReference:string = "";
  filterTrackingID:string = "";
  filterCreationDate:any = null;
  filterOriginalTrackingID:string = "";
  filterSender:string = "";

  returnsDate:any = "12-09-2020";

  currentReturns:any = null;

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
    var filteredData = this.tableData.filter(inbound=>
      inbound.status.indexOf(this.filterStatus) > -1 &&
      inbound.orderReference.indexOf(this.filterOrderReference) > -1 &&
      inbound.trackingID.toLowerCase().indexOf(this.filterTrackingID.toLowerCase()) > -1 &&
      inbound.originalTrackingID.toLowerCase().indexOf(this.filterOriginalTrackingID.toLowerCase()) > -1 &&
      (this.filterCreationDate != null?
      (Date.parse(inbound.creationDate) >= this.filterCreationDate[0] 
      && Date.parse(inbound.creationDate) <= this.filterCreationDate[1]):true) &&
      inbound.sender.toLowerCase().indexOf(this.filterSender.toLowerCase()) > -1 
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
      inbound.originalTrackingID.toLowerCase().indexOf(this.filterOriginalTrackingID.toLowerCase()) > -1 &&
      (this.filterCreationDate != null?
      (Date.parse(inbound.creationDate) >= this.filterCreationDate[0] 
      && Date.parse(inbound.creationDate) <= this.filterCreationDate[1]):true) &&
      inbound.sender.toLowerCase().indexOf(this.filterSender.toLowerCase()) > -1 
    );
    return filteredData;
  }
  changeAllCheck()
  {
    var checked = this.allCheck;
    var filteredData = this.getFilteredData;
    filteredData.forEach(function(row){
      row.checked = checked;
    });
  }
  search()
  {

  }
  reset()
  {
    this.filterStatus = "";
    this.filterOrderReference = "";
    this.filterCreationDate = null;
    this.filterSender = "";
    this.filterTrackingID = "";
    this.filterOriginalTrackingID = "";
  }
  export()
  {
    var content = "STATUS\tORDER REFERENCE\tRETURN TRACKING ID\tCREATION DATE\tORIGINAL TRACKING ID\tSENDER\n";
    this.getFilteredData.filter(a=>a.checked).forEach(function(row){
      content+=""+row.status+"\t"+row.orderReference+"\t"+row.trackingID+"\t"+row.creationDate+"\t"+row.originalTrackingID+"\t"+row.sender+"\n";
    });
    var filename = this.returnsDate+".txt";

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
  showMoreDetails(returns:any)
  {
    this.currentReturns = returns;
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
      case 'Return label printed':
        return 'secondary';
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
