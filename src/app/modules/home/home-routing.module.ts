import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListadoComponent } from '../listado/listado.component';
import { MensajesComponent } from '../mensajes/mensajes.component';

const routes: Routes = [
  {
    path: '',
    //ruta padre
    component: HomeComponent,
    children:
      [

        {
          path: 'listado',
          component: ListadoComponent

        }
        ,
        {
          path: 'mensaje',
          component: MensajesComponent
        },
        {
          path: '**',

          redirectTo: 'mensaje'
        }
      ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
