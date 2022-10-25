import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesPage } from './viajes.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesPage,
    children:[
      {
        path: 'prueba',
        loadChildren: () => import('../prueba/prueba.module').then( m => m.PruebaPageModule),
        
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesPageRoutingModule {}
