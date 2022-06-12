import { JsonpClientBackend } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import * as XLSX from 'xlsx';
import { languages } from '../../../shared/shared.data';

@Component({
  selector: 'app-removal-order',
  templateUrl: './removal-order.component.html',
  styleUrls: ['./removal-order.component.css']
})
export class RemovalOrderComponent implements OnInit {
  @ViewChild("fileupload", {static: false}) fileUpload: ElementRef;
  file:File;
  fileName:any = "";
  arrayBuffer:any;
  productsArray:any = [];

  editSKU:any = "";
  editProductName:any = "";
  editBarcode:any = "";
  editQuentity:any = "";
  enableNew:any = false;

  //from excel
  addressName:any = "";
  addressFieldOne:any = "";
  addressFieldTwo:any = "";
  addressFieldThree:any = "";
  addressCity:any = "";
  addressCountryCode:any = "";
  addressStateOrRegion:any = "";
  addressPostalCode:any = "";
  contactPhoneNumber:any = "";

  enableAddProduct:any = false;


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
  public handleFileInput(files:any)
  {
    this.file= files[0];     
    this.fileName = this.file.name;  
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});   
        
        
        console.log(arraylist); 
        if(arraylist.length > 8)
        {
          this.addressName = arraylist[0]["RETURN"];
          this.addressFieldOne = arraylist[1]["RETURN"];
          this.addressFieldTwo = arraylist[2]["RETURN"];
          this.addressFieldThree = arraylist[3]["RETURN"];
          this.addressCity = arraylist[4]["RETURN"];
          this.addressCountryCode = arraylist[5]["RETURN"];
          this.addressStateOrRegion = arraylist[6]["RETURN"];
          this.addressPostalCode = arraylist[7]["RETURN"];
          this.contactPhoneNumber = arraylist[8]["RETURN"];
          this.productsArray = [];
          for(var i=10;i<arraylist.length;i++)
          {
            var product = {
              "Product name*":arraylist[i]["RemovalDisposition"],
              "SKU*":arraylist[i]["RETURN"],
              "Barcode*":arraylist[i]["__EMPTY"],
              "Quantity*":arraylist[i]["__EMPTY_1"]
            }
            this.productsArray.push(product);
          }
        } 
                
        this.fileUpload.nativeElement.value = "";
    } 
  }
  public enableAddProducts() {
    this.enableAddProduct = true;
    this.enableNewLine();
  }
  public deleteFile()
  {
    this.file  =null;
    this.fileName = "";
    this.productsArray = [];
    this.addressName = "";
    this.addressFieldOne = "";
    this.addressFieldTwo = "";
    this.addressFieldThree = "";
    this.addressCity = "";
    this.addressCountryCode = "";
    this.addressStateOrRegion = "";
    this.addressPostalCode = "";
    this.contactPhoneNumber = "";
    
  }
  public downloadTemplate()
  {
    alert("download template");
  }
  public confirm()
  {
    alert("confirmed!");
  }
  public deleteProduct(i:number)
  {
    this.productsArray.splice(i,1);
  }
  public addNewLine()
  {
    var newLine = {
      "SKU*":this.editSKU,
      "Product name*":this.editProductName,
      "Barcode*":this.editBarcode,
      "Quantity*":this.editQuentity
    }
    console.log(newLine);
    console.log(this.productsArray[0]);
    //newLine = JSON.parse(JSON.stringify(newLine));
    this.productsArray.push(newLine);

    this.editSKU = "";
    this.editBarcode = "";
    this.editProductName = "";
    this.editQuentity = "";
    this.enableNew = false;
  }
  public enableNewLine()
  {
    this.enableNew = true;
  }
}
