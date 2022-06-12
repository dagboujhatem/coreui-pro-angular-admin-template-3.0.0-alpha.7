import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {langInfo, languages} from '../../../shared/shared.data';

@Component({
  selector: 'app-default-header-dropdown-langs',
  templateUrl: './default-header-dropdown-langs.component.html',
})
export class DefaultHeaderDropdownLangsComponent implements OnInit {
  public items = 5;

  public langs:any = langInfo;

  constructor(private translate:TranslateService,private router:Router,@Inject(DOCUMENT) private _document: Document) {
    
  }

  ngOnInit(): void {
    var lang:any = localStorage.getItem("lang");
    if(lang != null)
    {
      this.translate.use(lang) ;
    }
    else{
      this.translate.use(languages[0]);
    }
  }
  get getCurrentLang()
  {
    return this.translate.currentLang;
  }
  get getCurrentFlag()
  {
    var flag = this.langs[0].flag;
    this.langs.forEach(lang => {
      if(lang.name == this.getCurrentLang)
        flag = lang.flag;
    });
    return flag;
  }
    
  changeLang(lang:any)
  {
    this.translate.use(lang);
    localStorage.setItem("lang",lang);

    this._document.defaultView.location.reload();
  }
}
