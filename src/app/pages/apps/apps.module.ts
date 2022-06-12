import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AppsComponent } from './apps.component';
import { AppsRoutingModule } from './apps-routing.module';
import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  BreadcrumbModule,
  CardModule,
  CalloutModule,
  ChartModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  LayoutModule,
  ListGroupModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  SwitchModule,
  TabsetModule,
  TogglerModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';
@NgModule({
  imports: [
    BreadcrumbModule,
    CollapseModule,
    FormModule,
    LayoutModule,
    ListGroupModule,
    SwitchModule,
    TogglerModule,
    FormsModule,
    CommonModule,
    BadgeModule,
    AlertModule,
    AppsRoutingModule,
    SidebarModule,
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
    AppsComponent,
  ],
  providers: [
  ]

})
export class AppsModule { }
