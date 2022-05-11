import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { HomeComponent } from './pages/home/home.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
 
  {// ver esto
    //ruta padre
    path: '',
    component: HomeComponent,
    children:
      [
        {
          path: 'login',
         component: LoginComponent ,
        },
        {
          path: 'listado',
          component: TableComponent

        }
        ,
        {
          path: 'mensajes',
          component: MensajesComponent
        },
        {
          path:'listar',
          component: TableComponent
        },
        {
          path: '**',

          redirectTo: 'login'
        }
      ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class UsuariosRoutingModule { }
