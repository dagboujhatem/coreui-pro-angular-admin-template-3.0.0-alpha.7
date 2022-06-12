import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboundsComponent } from './inbounds.component';
import { SendInventoryComponent } from './send-inventory/send-inventory.component';

import { ShowDetailsComponent } from './show-details/show-details.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

const routes: Routes = [
  { path: '', component: InboundsComponent },
  { path: 'sendinventory', component: SendInventoryComponent },
  { path: 'showdetails', component: ShowDetailsComponent },
  { path: 'reportdetails', component: ReportDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboundsRoutingModule { }
