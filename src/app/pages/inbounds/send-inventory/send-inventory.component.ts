import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

//for generating pdf
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

//for generating barcode
import JsBarcode from 'jsbarcode/bin/JsBarcode'
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-send-inventory',
  templateUrl: './send-inventory.component.html',
  styleUrls: ['./send-inventory.component.css']
})
export class SendInventoryComponent implements OnInit {
  @ViewChild("fileupload", { static: false }) fileUpload: ElementRef;
  file: File = null;
  fileName: any = "";
  arrayBuffer: any;
  productsArray: any = [];

  step1Confirmed: any = false;
  step2Confirmed: any = false;

  editSKU: any = "";
  editProductName: any = "";
  editBarcode: any = "";
  editQuentity: any = "";
  enableNew: any = false;

  numberOfPackages: any = 1;

  numberOfBoxes: any = 2;

  enableAddProduct:any = false;

  //shifting variable for pdf type selecting
  public pdfType: number = 1;

  //predefined barcode informations
  private maxCounts = [0, 21, 24, 24, 24, 24, 24, 24, 27, 30, 40, 44];
  private barcodeSizes = [[0, 0], [180, 108], [180, 96.0945], [183.118, 95.811], [187.087, 96.0945], [187.087, 99.21], [198.4255, 102.047], [198.4255, 104.882], [180, 83.905], [189, 72], [148.819, 84.189], [137.48, 72]];
  private pageSizes = [[0, 0], [597.6, 842.4], [597.6, 842.4], [597.6, 842.4], [597.6, 842.4], [597.6, 842.4], [597.6, 842.4], [597.6, 842.4], [597.6, 842.4], [612, 792], [597.6, 842.4], [597.6, 842.4]];


  //step2 print boxes
  //predefined barcode informations
  private maxCounts2 = [0, 1, 4, 1];
  private barcodeSizes2 = [[0, 0], [250, 380], [250, 380], [250, 380]];
  private pageSizes2 = [[0, 0], [597.6, 842.4], [597.6, 842.4], [288, 432]];
  private colCounts2 = [0, 2, 2, 1];
  private rowCounts2 = [0, 2, 2, 1];

  //shifting variable for pdf type selecting
  public pdfType2: number = 1;
  public language: number = 1;

  public companyName: string = "Cubyn Fulfilment";
  public companyAddress: string = "7 route des Champs Fourgons";
  public companyPostcode: string = "2433";
  public companyCity: string = "Gdfeeff";
  public companyCountry: string = "BELGIUM";

  public warehouseName: string = "Cubyn Fulfilment";
  public warehouseAddress: string = "7 route des Champs Fourgons";
  public warehousePostcode: string = "92230";
  public warehouseCity: string = "Gennevillers";
  public warehouseCountry: string = "FRANCE";

  public numberOfBox: number = 1;
  public boxBarcode: string = "FBA15D3423454353";

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
    let str = localStorage.getItem("language");
    if (str === "") {
      this.language = 1;
    }
    else {
      this.language = parseInt(str);
    }
  }
  public handleFileInput(files: any) {
    this.file = files[0];
    this.fileName = this.file.name;
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.productsArray = arraylist;
      this.fileUpload.nativeElement.value = "";
    }

  }
  public deleteFile() {
    this.file = null;
    this.fileName = "";
    this.productsArray = [];
    this.step1Confirmed = false;
    this.step2Confirmed = false;

  }
  public downloadTemplate() {
    alert("download template");
  }
  public confirmStep1() {
    this.step1Confirmed = true;
  }
  public confirmStep2() {
    this.step2Confirmed = true;
  }
  public deleteProduct(i: number) {
    this.productsArray.splice(i, 1);
  }
  public addNewLine() {

    var newLine = {
      "SKU*": this.editSKU,
      "Product name*": this.editProductName,
      "Barcode*": this.editBarcode,
      "Quantity*": this.editQuentity
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
  public enableNewLine() {
    this.enableNew = true;
  }
  public enableAddProducts() {
    this.enableAddProduct = true;
    this.enableNewLine();
  }
  public backToStep1()
  {
    this.step1Confirmed = false;
    this.step2Confirmed = false;
  }

  //this fucntion generates barcode image from text
  textToBase64Barcode(text, product_name) {
    var canvas = document.createElement("canvas");
    const barcodeMargin = 35;
    JsBarcode(canvas, text, { format: "CODE128", margin: barcodeMargin, fontSize: 20 });

    const x = (-canvas.width / 2) + barcodeMargin;
    const y = canvas.height - (barcodeMargin / 2);

    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 20px Monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillText(product_name, x, y, canvas.width);

    return canvas.toDataURL("image/png");
  }

  //this function generate pdf with all barcodes
  public printProductsLabels() {
    //variable for containing barcode datas
    let content = [];

    //Max Count for placing on a paper
    let maxCountPerPage = this.maxCounts[this.pdfType];

    //barcode width (pixels)
    let barcodeWidth = this.barcodeSizes[this.pdfType][0];

    //barcode height (pixels)
    let barcodeHeight = this.barcodeSizes[this.pdfType][1];

    //page width (pixels)
    let pageWidth = this.pageSizes[this.pdfType][0];

    //page height pixels
    let pageHeight = this.pageSizes[this.pdfType][1];

    //column count for placing barcodes
    let bcColCount = Math.floor(pageWidth / barcodeWidth);

    //row count for placing barcodes
    let bcRowCount = Math.floor(maxCountPerPage / bcColCount) < Math.floor(pageHeight / barcodeHeight) ?
      Math.floor(maxCountPerPage / bcColCount) : Math.floor(pageHeight / barcodeHeight);

    //breath padding variable
    let paddingWidth = (pageWidth - bcColCount * barcodeWidth) / (bcColCount + 1);

    //height padding varible
    let paddingHeight = (pageHeight - bcRowCount * barcodeHeight) / (bcRowCount + 1);
    let pageMargin = 0;

    //index for loop and indexing
    let loop_index = 0;

    //construct barcode images for all barcodes
    for (var pIndex = 0; pIndex < this.productsArray.length; pIndex++) {
      let barcodeCount = this.productsArray[pIndex]["Quantity*"];
      for (let i = 0; i < barcodeCount; i++) {
        //coordinate of durrent barcode
        let x = (loop_index % bcColCount) * barcodeWidth + paddingWidth * (loop_index % bcColCount + 1);
        let y = paddingHeight + (barcodeHeight + paddingHeight) * (Math.floor(loop_index / bcColCount) % bcRowCount);

        //content of one barcode
        content[loop_index] = {
          image: this.textToBase64Barcode(this.productsArray[pIndex]["SKU*"], this.productsArray[pIndex]["Product name*"]),
          width: barcodeWidth,
          height: barcodeHeight,
          absolutePosition: {
            x: x,
            y: y
          },
          pageBreak: ''
        };

        //page control
        if (loop_index > 0 && loop_index % maxCountPerPage === 0) {
          content[loop_index]["pageBreak"] = 'before';
        }
        loop_index++;
      }
    }
    //pdf document infomation
    const documentDefination = {
      pageSize: { width: pageWidth, height: pageHeight },
      pageMargins: [pageMargin, pageMargin, pageMargin, pageMargin],
      content: content
    };
    pdfMake.createPdf(documentDefination).download();
  }


  //step2 functions
  //this fucntion generates barcode image from text
  private textToBase64Barcode2(text, boxNum) {
    var canvas = document.createElement("canvas");

    let barcodeWidth = 500;

    //barcode height (pixels)
    let barcodeHeight = 760;

    //set width and height of canvas
    canvas.width = barcodeWidth;
    canvas.height = barcodeHeight;

    let drawingRectWidth = canvas.width;
    let drawingRectHeight = canvas.height / 2;
    let topLineHeight = drawingRectHeight * 0.1;
    let topLineWeight = 4;
    let midLineHeight = drawingRectHeight * 0.4;
    let midLineWeight = 14;
    let bottomLineHeight = drawingRectHeight * 0.8;
    let bottomLineWeight = topLineWeight;
    let barcodeDrawingHeight = drawingRectHeight * 0.3;
    let barcodePosY = drawingRectHeight * 0.47;

    //draw all
    const ctx = canvas.getContext('2d');

    //draw top horizontal line
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, topLineHeight, drawingRectWidth, topLineWeight);

    //draw mid horizontal line
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, midLineHeight, drawingRectWidth, midLineWeight);

    //draw bottom horizontal line
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, bottomLineHeight, drawingRectWidth, bottomLineWeight);


    //draw top 1 text
    ctx.font = "24px Arial";
    let shoppingLabel = this.language == 1 ? "SHIPPING LABEL" : "ÉTIQUETTE D'EXPÉDITION";
    ctx.fillText(shoppingLabel, 4, topLineHeight - 3);

    ctx.font = "30px Arial";
    let box3 = this.language == 1 ? "Box " + boxNum : "Carton n° " + boxNum;
    ctx.fillText(box3, drawingRectWidth - 15 * box3.length - 2, topLineHeight - 3);

    //ship from
    let placeTextHeight = topLineHeight;
    let placeX = 4;
    let maxTextW = drawingRectWidth / 2 - 16;
    let fontSize = 16;

    placeTextHeight += 20;
    let shipFrom = this.language == 1 ? "SHIP FROM:" : "Expediteur";
    this.writeText(ctx, shipFrom, fontSize, placeX, placeTextHeight);

    //companyName
    placeTextHeight += 16;
    let textInfos = this.getTextInfo(this.companyName, 1, maxTextW);
    console.log(textInfos);
    this.writeText(ctx, textInfos.text1, textInfos.fontSize, placeX, placeTextHeight);

    //companyAddress
    placeTextHeight += 16;
    textInfos = this.getTextInfo(this.companyAddress, 2, maxTextW);
    this.writeText(ctx, textInfos.text1, textInfos.fontSize, placeX, placeTextHeight);

    //second line
    if (textInfos.lineCount == 2) {
      placeTextHeight += 16;
      this.writeText(ctx, textInfos.text2, textInfos.fontSize, placeX, placeTextHeight);
    }

    //postcode. city
    let postcode = this.companyPostcode;
    let companyCity = this.companyCity;
    placeTextHeight += 16;
    textInfos = this.getTextInfo(companyCity + ", " + postcode, 1, maxTextW);
    this.writeText(ctx, textInfos.text1, textInfos.fontSize, placeX, placeTextHeight);

    //company country
    placeTextHeight += 16;
    textInfos = this.getTextInfo(this.companyCountry, 1, maxTextW);
    this.writeText(ctx, textInfos.text1, textInfos.fontSize, placeX, placeTextHeight);

    //ship to
    let shipTo = this.language == 1 ? "SHIP TO:" : "Destinataire";
    placeTextHeight = topLineHeight + 20;
    placeX = drawingRectWidth / 2;
    ctx.fillText(shipTo, placeX, placeTextHeight);

    //warehouseName
    placeTextHeight += 16;
    textInfos = this.getTextInfo(this.warehouseName, 1, maxTextW);
    this.writeText(ctx, textInfos.text1, textInfos.fontSize, placeX, placeTextHeight);

    //warehouseAddress
    placeTextHeight += 16;
    textInfos = this.getTextInfo(this.warehouseAddress, 2, maxTextW);
    this.writeText(ctx, textInfos.text1, textInfos.fontSize, placeX, placeTextHeight);

    if (textInfos.lineCount == 2) {
      placeTextHeight += 16;
      this.writeText(ctx, textInfos.text2, textInfos.fontSize, placeX, placeTextHeight);
    }
    //warehouseCity postcode
    placeTextHeight += 16;
    textInfos = this.getTextInfo(this.warehouseCity + ", " + this.warehousePostcode, 1, maxTextW);
    this.writeText(ctx, textInfos.text1, textInfos.fontSize, placeX, placeTextHeight);

    //country
    placeTextHeight += 16;
    textInfos = this.getTextInfo(this.warehouseCountry, 1, maxTextW);
    this.writeText(ctx, textInfos.text1, textInfos.fontSize, placeX, placeTextHeight);

    //publish date
    let date = new Date();
    let dateStr = date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
    let publishDate = "FBA(" + dateStr + ")";
    ctx.font = "10px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(publishDate, 4, midLineHeight + 10);

    //country
    let bottomText = this.language == 1 ? "PLEASE LEAVE THIS LABEL UNCOVERED" : "VEUILLEZ LAISSER CETTE ÉTIQUETTE VISIBLE";
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(bottomText, (drawingRectWidth - 12 * bottomText.length) / 2, drawingRectHeight - 20);

    let barcodeImage = this.getBarcodeImage(text, drawingRectWidth, barcodeDrawingHeight);
    if (barcodeImage.width > drawingRectWidth * 0.8) {
      ctx.drawImage(barcodeImage, (drawingRectWidth - drawingRectWidth * 0.8) / 2, barcodePosY, drawingRectWidth * 0.8, barcodeDrawingHeight);
    }
    else {
      ctx.drawImage(barcodeImage, (drawingRectWidth - barcodeImage.width) / 2, barcodePosY, barcodeImage.width, barcodeDrawingHeight);
    }

    return canvas.toDataURL("image/png");
  }
  private getTextInfo(text: string, lineCount: number, maxW: number, fillStyle: string = "black") {
    let textInfos = {
      fontSize: 16,
      lineCount: 1,
      offsetY: 16,
      text1: "",
      text2: "",
      fillStyle: "black"
    };
    textInfos.fillStyle = fillStyle;

    let currentW = this.getTextWidth(text, textInfos.fontSize);
    if (currentW <= maxW) {
      textInfos.text1 = text;
      return textInfos;
    }
    else {
      if (lineCount == 1) {
        textInfos.fontSize = this.determineFontSizeFrom(text, maxW);
        textInfos.text1 = text;
      }
      else {
        if (currentW < maxW * 2) {
          textInfos.lineCount = lineCount;
        }
        else {
          textInfos.fontSize = this.determineFontSizeFrom(text, 2 * maxW);
          textInfos.lineCount = lineCount;
        }
        let firstIndex = this.getIndexOfWidth(text, maxW, textInfos.fontSize);
        textInfos.text1 = text.substr(0, firstIndex + 1);
        textInfos.text2 = text.substr(firstIndex + 1, text.length - firstIndex - 1);
      }
    }

    return textInfos;
  }
  private writeText(ctx, text: string, fontSize: number, x: number, y: number, fillStye: string = "black") {
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = fillStye;
    ctx.fillText(text, x, y);
  }
  private getBarcodeImage(text, bcWidth, bcHeight) {
    var canvas = document.createElement("canvas");

    JsBarcode(canvas, text, {
      format: "code128",
      width: 2,
      margin: 10,
      height: bcHeight,
      border: 0,
      outline: "none"
    });
    canvas.style.border = "0px none black";
    canvas.style.outline = "none";
    return canvas;
  }
  private getTextWidth(text: string, fontSize: number) {
    let width = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] == text[i].toUpperCase()) {
        width += fontSize * 4 / 7;
      }
      else {
        width += fontSize / 2;
      }
    }
    return width;
  }
  private determineFontSizeFrom(text: string, maxW: number) {
    let upperCount = 0;
    let lowerCount = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] == text[i].toUpperCase()) {
        upperCount++;
      }
      else {
        lowerCount++;
      }
    }
    return Math.floor(maxW / (upperCount * 4 / 7 + lowerCount / 2));
  }
  private getIndexOfWidth(text: string, maxW: number, fontSize: number) {
    let width = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] == text[i].toUpperCase()) {
        width += fontSize * 4 / 7;
      }
      else {
        width += fontSize / 2;
      }

      if (width > maxW) {
        return i - 1;
      }
    }
    return text.length - 1;
  }
  public printBoxLabels() {
    //variable for containing barcode datas
    let content = [];

    //Max Count for placing on a paper
    let maxCountPerPage = this.maxCounts2[this.pdfType2];

    //barcode width (pixels)
    let barcodeWidth = this.barcodeSizes2[this.pdfType2][0];

    //barcode height (pixels)
    let barcodeHeight = this.barcodeSizes2[this.pdfType2][1];

    //page width (pixels)
    let pageWidth = this.pageSizes2[this.pdfType2][0];

    //page height pixels
    let pageHeight = this.pageSizes2[this.pdfType2][1];

    //column count for placing barcodes
    let bcColCount = this.colCounts2[this.pdfType2];

    //row count for placing barcodes
    let bcRowCount = this.rowCounts2[this.pdfType2];

    //breath padding variable
    let paddingWidth = (pageWidth - bcColCount * barcodeWidth) / (bcColCount + 1);

    //height padding varible
    let paddingHeight = (pageHeight - bcRowCount * barcodeHeight) / (bcRowCount + 1);
    let pageMargin = 0;
    console.log("paddingWidth=" + paddingWidth);
    console.log("paddingHeight=" + paddingHeight);
    //index for loop and indexing


    //construct barcode images for all barcodes
    for (let loop_index = 0; loop_index < this.numberOfBox; loop_index++) {
      //coordinate of durrent barcode
      let x = 0;
      let y = 0;
      if (this.pdfType2 == 1 || this.pdfType2 == 3) {
        x = paddingWidth;
        y = paddingHeight;
      }
      else if (this.pdfType2 == 2) {
        x = (loop_index % bcColCount) * barcodeWidth + paddingWidth * (loop_index % bcColCount + 1);
        y = paddingHeight + (barcodeHeight + paddingHeight) * (Math.floor(loop_index / bcColCount) % bcRowCount);
      }

      //content of one barcode
      content[loop_index] = {
        image: this.textToBase64Barcode2(this.boxBarcode, loop_index + 1),
        width: barcodeWidth,
        height: barcodeHeight,
        absolutePosition: {
          x: x,
          y: y
        },
        pageBreak: ''
      };

      //page control
      console.log("loop=" + loop_index + ",max=" + maxCountPerPage);
      if (loop_index > 0 && loop_index % maxCountPerPage === 0) {
        content[loop_index]["pageBreak"] = 'before';
      }
    }

    //pdf document infomation
    const documentDefination = {
      pageSize: { width: pageWidth, height: pageHeight },
      pageMargins: [pageMargin, pageMargin, pageMargin, pageMargin],
      content: content
    };
    pdfMake.createPdf(documentDefination).download();
  }
}
