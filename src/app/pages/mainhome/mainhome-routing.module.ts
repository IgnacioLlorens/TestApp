import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainhomePage } from './mainhome.page';

const routes: Routes = [
  {
    path: '',
    component: MainhomePage,
    children:[
      {
        path: 'perfil/:rut',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'listauto/:rut',
        loadChildren: () => import('../listauto/listauto.module').then( m => m.ListautoPageModule)
      },
      {
        path: 'viaje/:rut',
        loadChildren: () => import('../viaje/viaje.module').then( m => m.ViajePageModule)
      },
      {
        path: 'viajes/:rut',
        loadChildren: () => import('../viajes/viajes.module').then( m => m.ViajesPageModule)
      },
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainhomePageRoutingModule {}
