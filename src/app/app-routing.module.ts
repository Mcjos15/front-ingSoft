import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './usuarios/pages/home/home.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { LoginComponent } from './usuarios/components/login/login.component';
import { RegisterComponent } from './usuarios/components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

 { path: 'login',
   component: LoginComponent ,
   pathMatch: "full"
  },
    {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./usuarios/usuarios.module').then(m =>m.UsuariosModule),
    canActivate:[AuthGuard]
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
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
