import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { AddParcelComponent } from './add-parcel/add-parcel.component';

import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'sendorders', component: AddParcelComponent },
  { path: 'showdetails', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
