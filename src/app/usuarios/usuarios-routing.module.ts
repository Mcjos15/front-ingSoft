import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { HomeComponent } from './pages/home/home.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

const routes: Routes = [
  {
    path: '',
    //ruta padre
    component: HomeComponent,
    children:
      [

        {
          path: 'listado',
          component: TableComponent

        }
        ,
        {
          path: 'mensaje',
          component: MensajesComponent
        },
        {
          path:'listar',
          component: TableComponent
        },
        {
          path: '**',

          redirectTo: 'listado'
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
