import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';
import { CreateBundleComponent } from './create-bundle/create-bundle.component';

import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: InventoryComponent },
  { path: 'createbundle', component: CreateBundleComponent },
  { path: 'showdetails', component:DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
