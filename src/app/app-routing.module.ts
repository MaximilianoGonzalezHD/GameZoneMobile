import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'juego/:slug',
    loadChildren: () => import('./pages/juego/juego.module').then( m => m.JuegoPageModule)
  },
  {
    path: 'juego-plei/:slug',
    loadChildren: () => import('./pages/juego-plei/juego-plei.module').then( m => m.JuegoPleiPageModule)
  },
  {
    path: 'juego-xbox/:slug',
    loadChildren: () => import('./pages/juego-xbox/juego-xbox.module').then( m => m.JuegoXboxPageModule)
  },
  {
    path: 'juego-pc/:slug',
    loadChildren: () => import('./pages/juego-pc/juego-pc.module').then( m => m.JuegoPcPageModule)
  },

  {
    path: 'juegos-nintendo',
    loadChildren: () => import('./pages/juegos-nintendo/juegos-nintendo.module').then( m => m.JuegosNintendoPageModule)
  },
  {
    path: 'juegos-pc',
    loadChildren: () => import('./pages/juegos-pc/juegos-pc.module').then( m => m.JuegosPcPageModule)
  },
  {
    path: 'juegos-xbox',
    loadChildren: () => import('./pages/juegos-xbox/juegos-xbox.module').then( m => m.JuegosXboxPageModule)
  },
  {
    path: 'juegos-play-station',
    loadChildren: () => import('./pages/juegos-play-station/juegos-play-station.module').then( m => m.JuegosPlayStationPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'mod-producto',
    loadChildren: () => import('./pages/mod-producto/mod-producto.module').then( m => m.ModProductoPageModule)
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./pages/agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'olvide-contrasena',
    loadChildren: () => import('./pages/olvide-contrasena/olvide-contrasena.module').then( m => m.OlvideContrasenaPageModule)
  },
  {
    path: 'datos-pago',
    loadChildren: () => import('./pages/datos-pago/datos-pago.module').then( m => m.DatosPagoPageModule)
  },
  {
    path: 'paga-confirmado',
    loadChildren: () => import('./pages/paga-confirmado/paga-confirmado.module').then( m => m.PagaConfirmadoPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'mod-perfil',
    loadChildren: () => import('./pages/mod-perfil/mod-perfil.module').then( m => m.ModPerfilPageModule)
  },
  
  {
    path: 'lista-videojuegos',
    loadChildren: () => import('./pages/lista-videojuegos/lista-videojuegos.module').then( m => m.ListaVideojuegosPageModule)
  },
  {
    path: 'lista-usuario',
    loadChildren: () => import('./pages/lista-usuario/lista-usuario.module').then( m => m.ListaUsuarioPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  },
 








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
