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
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  declarations: [
    HomeComponent,
    MensajesComponent,
   TableComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    DataTablesModule,
    FlexLayoutModule,
    QRCodeModule
  ]
})
export class UsuariosModule { }
