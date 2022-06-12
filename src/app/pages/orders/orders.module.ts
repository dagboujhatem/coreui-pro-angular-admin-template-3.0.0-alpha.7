import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
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
import { AddParcelComponent } from './add-parcel/add-parcel.component';
import { DetailsComponent } from './details/details.component';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';
// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [OrdersComponent, AddParcelComponent, DetailsComponent],
  imports: [
    CommonModule,
    AlertModule,
    TabsetModule,
    SidebarModule,
    FormModule,
    OrdersRoutingModule,
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
export class OrdersModule { }
