import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './usuarios/components/login/login.component';
import { RegisterComponent } from './usuarios/components/register/register.component';

import { TokenInterceptorService } from './servicios/token-interceptor.service';
import { EditarComponent } from './usuarios/editar/editar.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { CreateDepaComponent } from './usuarios/create-depa/create-depa.component';
//import { TableDepaComponent } from './usuarios/pages/table-depa/table-depa.component';
import { SocketIoModule,SocketIoConfig } from 'ngx-socket-io';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EditarComponent,
    CrearUsuarioComponent,
    CreateDepaComponent,
    //TableDepaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
