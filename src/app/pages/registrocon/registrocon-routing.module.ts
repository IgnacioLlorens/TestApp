import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroconPage } from './registrocon.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroconPageRoutingModule {}
