import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { languages } from '../../shared/shared.data';
import { inventoryData } from './inventory-data';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  @ViewChild("asideToggle", { static: false }) asideToggle: ElementRef;
  tableData = inventoryData;
  currentPage = 1;
  page: number = 10;

  filterSKU: string = "";
  filterProductName: string = "";

  inventoryDate: any = "12-09-2020";

  currentInventory: any = null;

  asideShow: any = false;

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
      inbound.sku.toLowerCase().indexOf(this.filterSKU.toLowerCase()) > -1 &&
      inbound.productName.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1
    );
    const startItem = (this.currentPage - 1) * this.page;
    const endItem = this.currentPage * this.page;
    return filteredData.slice(startItem, endItem);
  }
  get getFilteredData() {
    var filteredData = this.tableData.filter(inbound =>
      inbound.sku.toLowerCase().indexOf(this.filterSKU.toLowerCase()) > -1 &&
      inbound.productName.toLowerCase().indexOf(this.filterProductName.toLowerCase()) > -1
    );
    return filteredData.sort(function (a, b) { return a.availableStock - b.availableStock });
  }
  search() {

  }
  reset() {
    this.filterSKU = "";
    this.filterProductName = "";
  }
  export() {
    var content = "SKU\tPRODUCT NAME\tAVAILABLE STOCK\tRESERVED STOCK\n";
    this.tableData.forEach(function (row) {
      content += "" + row.sku + "\t" + row.productName + "\t" + row.availableStock + "\t" + row.reservedStock + "\n";
    });
    var filename = this.inventoryDate + ".txt";

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
  editInventory(inventory: any) {
    this.currentInventory = inventory;
    this.toggleAside();
  }
  confirmEdit() {
    this.toggleAside()
  }
  toggleAside() {
    this.asideShow = !this.asideShow;
    this.asideToggle.nativeElement.click();
  }
}
