import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'registrocon',
    loadChildren: () => import('./pages/registrocon/registrocon.module').then( m => m.RegistroconPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'mainhome',
    loadChildren: () => import('./pages/mainhome/mainhome.module').then( m => m.MainhomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then( m => m.QrcodePageModule)
  },
  {
    path: 'geoloca',
    loadChildren: () => import('./pages/geoloca/geoloca.module').then( m => m.GeolocaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'mantenedor',
    loadChildren: () => import('./pages/mantenedor/mantenedor.module').then( m => m.MantenedorPageModule)
  },
  {
    path: 'autos',
    loadChildren: () => import('./pages/autos/autos.module').then( m => m.AutosPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'prueba',
    loadChildren: () => import('./pages/prueba/prueba.module').then( m => m.PruebaPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'api',
    loadChildren: () => import('./pages/api/api.module').then( m => m.ApiPageModule)
  },
  
  {
    path: '**',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
