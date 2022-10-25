import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListautoPage } from './listauto.page';

const routes: Routes = [
  {
    path: '',
    component: ListautoPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListautoPageRoutingModule {}
