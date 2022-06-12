import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {
  CalloutModule,
  CardModule,
  GridModule,
  BadgeModule,
  ProgressModule,
  ButtonModule,
  DropdownModule,
  ChartModule,
  TabsetModule,
  SharedModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ShipmentAnalyticsComponent } from './shipment-analytics/shipment-analytics.component';
import { ProductsShipmentsComponent } from './products-shipments/products-shipments.component';
import { ShipmentsChartComponent } from './shipments-chart/shipments-chart.component';

import {TranslateLoader, TranslateModule, TranslateService, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    BadgeModule,
    DashboardRoutingModule,
    // ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CalloutModule,
    CardModule,
    GridModule,
    IconModule,
    ProgressModule,
    ButtonModule,
    DropdownModule,
    ChartModule,
    TabsetModule,
    SharedModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http] 
  })
  ],
  declarations: [
    DashboardComponent,
    ShipmentAnalyticsComponent,
    ProductsShipmentsComponent,
    ShipmentsChartComponent
  ],
  providers: [
    TranslateService
  ]


})
export class DashboardModule { }
