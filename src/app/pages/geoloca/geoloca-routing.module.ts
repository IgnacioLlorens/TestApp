import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeolocaPage } from './geoloca.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocaPageRoutingModule {}
