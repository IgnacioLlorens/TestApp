import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroconPageRoutingModule } from './registrocon-routing.module';

import { RegistroconPage } from './registrocon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroconPageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [RegistroconPage]
})
export class RegistroconPageModule {}
