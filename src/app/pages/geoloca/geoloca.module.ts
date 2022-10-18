import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocaPageRoutingModule } from './geoloca-routing.module';

import { GeolocaPage } from './geoloca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocaPageRoutingModule
  ],
  declarations: [GeolocaPage]
})
export class GeolocaPageModule {}
