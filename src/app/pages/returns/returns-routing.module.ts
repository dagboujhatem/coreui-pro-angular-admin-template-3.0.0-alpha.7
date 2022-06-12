import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnsComponent } from './returns.component';

import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: ReturnsComponent },
  { path: 'showdetails', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnsRoutingModule { }
