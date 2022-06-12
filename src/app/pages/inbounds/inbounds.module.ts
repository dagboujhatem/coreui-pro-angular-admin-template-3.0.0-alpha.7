import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboundsRoutingModule } from './inbounds-routing.module';
import { InboundsComponent } from './inbounds.component';
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
  SwitchModule,
  TabsetModule
} from '@coreui/angular';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { IconModule } from '@coreui/icons-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SendInventoryComponent } from './send-inventory/send-inventory.component';
import { DetailsComponent } from './details/details.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';

@NgModule({
  declarations: [InboundsComponent, SendInventoryComponent, DetailsComponent, ShowDetailsComponent, ReportDetailsComponent],
  imports: [
    CommonModule,
    AlertModule,
    SwitchModule,
    BsDatepickerModule.forRoot(),
    TabsetModule,
    FormModule,
    InboundsRoutingModule,
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
export class InboundsModule { }
