import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { 
  BadgeModule, 
  AlertModule,
  ButtonModule, 
  CardModule, 
  FormModule, 
  GridModule,
  AccordionModule,
  BreadcrumbModule,
  CollapseModule,
  ImgModule,
  NavbarModule,
  ProgressModule,
  SwitchModule,
  SpinnerModule,
  TabsetModule,
  ListGroupModule,
  TogglerModule,
  NavModule,
 } from '@coreui/angular';


import { ProfileComponent } from './profile/profile.component';
import { CustomsComponent } from './customs/customs.component';
import { PasswordComponent } from './password/password.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReturnComponent } from './return/return.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { WarrantyComponent } from './warranty/warranty.component';
import  {  PdfViewerModule  }  from  'ng2-pdf-viewer';

import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { Http } from '@angular/http';

export const routes = [
  { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Profile' } },
  { path: 'password', component: PasswordComponent, data: { breadcrumb: 'Password' } },
  { path: 'return', component: ReturnComponent, data: { breadcrumb: 'Return' } },
  { path: 'customs', component: CustomsComponent, data: { breadcrumb: 'Customs' } },
  { path: 'warranty', component: WarrantyComponent, data: { breadcrumb: 'Warranty' } },
  { path: 'payment', component: PaymentsComponent, data: { breadcrumb: 'Payment' } },
  { path: 'termsofuse', component: TermsOfUseComponent, data: { breadcrumb: 'Terms Of Use' } },
];
@NgModule({
  imports: [
    CommonModule,
    AlertModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BadgeModule, 
    ButtonModule, 
    CardModule, 
    FormModule, 
    GridModule,
    AccordionModule,
    BreadcrumbModule,
    CollapseModule,
    ImgModule,
    NavbarModule,
    ProgressModule,
    SwitchModule,
    SpinnerModule,
    TabsetModule,
    ListGroupModule,
    TogglerModule,
    NavModule,
    PdfViewerModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http] 
  })
  ],
  declarations: [

  ProfileComponent,

  CustomsComponent,

  PasswordComponent,

  PaymentsComponent,

  ReturnComponent,

  TermsOfUseComponent,

  WarrantyComponent],
  bootstrap: [ProfileComponent],
})
export class UserinfoModule { }
