import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutboundsRoutingModule } from './outbounds-routing.module';
import { OutboundsComponent } from './outbounds.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { 
  CardModule, 
  GridModule, 
  BadgeModule, 
  ButtonModule, 
  CollapseModule,
  FormModule,
  AlertModule,
  TabsetModule
 } from '@coreui/angular';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { IconModule } from '@coreui/icons-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RemovalOrderComponent } from './removal-order/removal-order.component';
import { DetailsComponent } from './details/details.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [OutboundsComponent, RemovalOrderComponent, DetailsComponent, ShowDetailsComponent, ReportDetailsComponent],
  imports: [
    CommonModule,
    AlertModule,
    FormModule,
    TabsetModule,
    BsDatepickerModule.forRoot(),
    OutboundsRoutingModule,
    BadgeModule,
    CardModule,
    GridModule,
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
export class OutboundsModule { }
