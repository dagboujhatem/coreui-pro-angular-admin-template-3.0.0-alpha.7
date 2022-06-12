import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { languages } from '../../shared/shared.data';
import { errorsData } from './errors-data';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  @ViewChild("asideToggle", { static: false }) asideToggle: ElementRef;
  @ViewChild("fileupload", { static: false }) fileUpload: ElementRef;
  file: File = null;
  fileName: any = "";

  allCheck: any = false;

  tableData = errorsData;
  currentPage = 1;
  page: number = 10;

  asideShow: any = false;

  filterErrorType: string = "";
  filterOrderReference: string = "";
  filterTrackingID: string = "";
  filterCreationDate: any = null;
  filterRecipient: string = "";
  filterCountry: string = "";
  filterDeliveryMode: string = "";

  errorsDate: any = "12-09-2020";

  currentErrors: any = null;

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
      inbound.errorType.indexOf(this.filterErrorType) > -1 &&
      inbound.orderReference.indexOf(this.filterOrderReference) > -1 &&
      inbound.trackingID.toLowerCase().indexOf(this.filterTrackingID.toLowerCase()) > -1 &&
      inbound.recipient.toLowerCase().indexOf(this.filterRecipient.toLowerCase()) > -1 &&
      (this.filterCreationDate != null ?
        (Date.parse(inbound.creationDate) >= this.filterCreationDate[0]
          && Date.parse(inbound.creationDate) <= this.filterCreationDate[1]) : true) &&
      inbound.country.toLowerCase().indexOf(this.filterCountry.toLowerCase()) > -1 &&
      inbound.deliveryMode.toLowerCase().indexOf(this.filterDeliveryMode.toLowerCase()) > -1
    );
    const startItem = (this.currentPage - 1) * this.page;
    const endItem = this.currentPage * this.page;
    return filteredData.slice(startItem, endItem);
  }
  get getFilteredData() {
    var filteredData = this.tableData.filter(inbound =>
      inbound.errorType.indexOf(this.filterErrorType) > -1 &&
      inbound.orderReference.indexOf(this.filterOrderReference) > -1 &&
      inbound.trackingID.toLowerCase().indexOf(this.filterTrackingID.toLowerCase()) > -1 &&
      inbound.recipient.toLowerCase().indexOf(this.filterRecipient.toLowerCase()) > -1 &&
      (this.filterCreationDate != null ?
        (Date.parse(inbound.creationDate) >= this.filterCreationDate[0]
          && Date.parse(inbound.creationDate) <= this.filterCreationDate[1]) : true) &&
      inbound.country.toLowerCase().indexOf(this.filterCountry.toLowerCase()) > -1 &&
      inbound.deliveryMode.toLowerCase().indexOf(this.filterDeliveryMode.toLowerCase()) > -1
    );
    return filteredData;
  }
  changeAllCheck() {
    var checked = this.allCheck;
    var filteredData = this.getFilteredData;
    filteredData.forEach(function (row) {
      row.checked = checked;
    });
  }
  search() {

  }
  reset() {
    this.filterErrorType = "";
    this.filterOrderReference = "";
    this.filterCreationDate = null;
    this.filterRecipient = "";
    this.filterTrackingID = "";
    this.filterCountry = "";
    this.filterDeliveryMode = "";
  }
  export() {
    var content = "ERROR TYPE\tORDER REFERENCE\tTRACKING ID\tCREATION DATE\tRECIPIENT\tCOUNTRY\tDELIVERY MODE\n";
    this.getFilteredData.filter(a => a.checked).forEach(function (row) {
      content += "" + row.errorType + "\t" + row.orderReference + "\t" + row.trackingID + "\t" + row.creationDate + "\t" + row.recipient + "\t" + row.country + "\t" + row.deliveryMode + "\n";
    });
    var filename = this.errorsDate + ".txt";

    this.download(filename, content);
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
  showMoreDetails(errors: any) {
    this.currentErrors = errors;
    this.toggleAside();
  }
  confirmEdit() {
    this.toggleAside();
  }
  toggleAside() {
    this.asideShow = !this.asideShow;
    this.asideToggle.nativeElement.click();
  }
  getBadge(status) {
    switch (status) {
      case 'Address':
        return 'info';
      case 'Unknown SKU':
        return 'secondary';
      case 'Out of Stock':
        return 'warning';
      default:
        return 'primary';
    }
  }
  public handleFileInput(files: any) {
    this.file = files[0];
    this.fileName = this.file.name;
  }
}
