import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';

@Component({
  selector: 'app-add-parcel',
  templateUrl: './add-parcel.component.html',
  styleUrls: ['./add-parcel.component.css']
})
export class AddParcelComponent implements OnInit {
  @ViewChild("fileupload", {static: false}) fileUpload: ElementRef;
  file:File = null;
  fileName:any = "";

  confirmed:any = false;
  //budles
  bundles:any = [{sku:"",quentity:1}];

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
  addBundle()
  {
    var bundle={sku:"",quentity:1};
    this.bundles.push(bundle);
  }
  deleteBundle(i:number)
  {
    this.bundles.splice(i,1);
  }
  createBundle()
  {
    alert("create bundle");
  }
  public handleFileInput(files:any)
  {
    this.file= files[0];   
    this.fileName = this.file.name;  
  }
  confirmStep1()
  {
    this.confirmed = true;
  }
  confrimStep2()
  {
    
  }
}
