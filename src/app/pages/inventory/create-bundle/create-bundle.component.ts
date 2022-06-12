import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { languages } from '../../../shared/shared.data';

@Component({
  selector: 'app-create-bundle',
  templateUrl: './create-bundle.component.html',
  styleUrls: ['./create-bundle.component.css']
})
export class CreateBundleComponent implements OnInit {
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
}
