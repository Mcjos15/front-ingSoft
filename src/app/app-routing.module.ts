import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './usuarios/pages/home/home.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { LoginComponent } from './usuarios/components/login/login.component';
import { RegisterComponent } from './usuarios/components/register/register.component';

const routes: Routes = [

 /*{ path: 'login',
   component: LoginComponent ,
   pathMatch: "full"
  },*/
    {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('./usuarios/usuarios.module').then(m =>m.UsuariosModule),
    //pathMatch: "full"
  },

  { path: 'register',
   component: RegisterComponent,
   pathMatch: "full"
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
