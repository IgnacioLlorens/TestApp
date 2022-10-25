import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListautoPageRoutingModule } from './listauto-routing.module';

import { ListautoPage } from './listauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListautoPageRoutingModule
  ],
  declarations: [ListautoPage]
})
export class ListautoPageModule {}
