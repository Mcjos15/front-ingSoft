import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { TableComponent } from '../usuarios/pages/table/table.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from '../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableDepaComponent } from './pages/table-depa/table-depa.component';

import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    HomeComponent,
    MensajesComponent,
    TableComponent,
    UsuarioComponent,
    TableDepaComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    DataTablesModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,


  ]
})
export class UsuariosModule { }
