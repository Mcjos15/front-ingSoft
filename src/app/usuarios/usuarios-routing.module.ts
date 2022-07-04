import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { HomeComponent } from './pages/home/home.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard } from '../guards/role.guard';
import { EditarComponent } from './editar/editar.component';
import { TableDepaComponent } from './pages/table-depa/table-depa.component';
import { CreateDepaComponent } from './create-depa/create-depa.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { ReporteriaComponent } from './pages/reporteria/reporteria.component';

const routes: Routes = [

  {// ver esto
    //ruta padre
    path: '',
    component: HomeComponent,
    children:
      [
        /* {
           path: 'login',
          component: LoginComponent ,
         },*/
        {
          path: 'listado',
          component: TableComponent, canActivate:[RoleGuard],
          data: { expectedRole: 'sa' }

        }
        ,
        {
          path: 'editar/:id',
          component: EditarComponent,
         // data: { expectedRole: 'sa' }

        }
        ,
        {
          path: 'departamento',
          component: TableDepaComponent,
          //data: { expectedRole: 'sa' }

        },
        {
          path: 'solicitud',
          component: SolicitudComponent,
          //data: { expectedRole: 'sa' }

        }
        ,
        {
          path: 'agregarDep',
          component: CreateDepaComponent,
          //data: { expectedRole: 'sa' }

        }
        ,
        {
          path: 'mensajes',
          component: MensajesComponent
        },
        {
          path: 'listar',
          component: TableComponent
        },
        {
          path: 'reporteria',
          component: ReporteriaComponent
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
  exports: [
    RouterModule
  ]
})
export class UsuariosRoutingModule { }
