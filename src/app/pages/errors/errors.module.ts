import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsComponent } from './errors.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { 
  CardModule, 
  GridModule, 
  BadgeModule, 
  ButtonModule, 
  CollapseModule,
  AlertModule,
  FormModule,
  SidebarModule,
  TabsetModule
 } from '@coreui/angular';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { IconModule } from '@coreui/icons-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';
@NgModule({
  declarations: [ErrorsComponent],
  imports: [
    CommonModule,
    AlertModule,
    TabsetModule,
    SidebarModule,
    FormModule,
    ErrorsRoutingModule,
    BadgeModule,
    CardModule,
    GridModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    ButtonModule,
    NgxDaterangepickerMd.forRoot(),
    IconModule,
    CollapseModule,
    BsDropdownModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http] 
  })
  ]
})
export class ErrorsModule { }
