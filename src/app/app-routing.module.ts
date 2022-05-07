import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './usuarios/pages/home/home.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('./usuarios/usuarios.module').then(m =>m.UsuariosModule)
  },

  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
