import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutboundsComponent } from './outbounds.component';
import { RemovalOrderComponent } from './removal-order/removal-order.component';

import { ShowDetailsComponent } from './show-details/show-details.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

const routes: Routes = [
  { path: '', component: OutboundsComponent },
  { path: 'removalorder', component: RemovalOrderComponent },
  { path: 'showdetails', component: ShowDetailsComponent },
  { path: 'reportdetails', component: ReportDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutboundsRoutingModule { }
