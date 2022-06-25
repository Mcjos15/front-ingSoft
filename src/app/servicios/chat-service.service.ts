import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { Solicitud } from '../usuarios/interfaces/solicitud.interface';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../usuarios/interfaces/mensajes.interface';


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public socketStatus = false;
  private socket: any;
  private baseURL: string = environment.baseUrl;
  private user!: string;
  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:8080');
    this.checkStatus();
    this.cargarStorage();
  }


  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  public createRoom(room:string){
    this.emit('entrarChat', room);
  }
  public sendMessage(message: any,room:string) {

    const payload = {
      de: sessionStorage.getItem('user'),
      cuerpo: message,
      sala:room
    };

    this.socket.emit('message', payload);
  }


  postSolicitud(soli:Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.baseURL}/solicitud`, soli);
  }


  getDepaById(soli:Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.baseURL}/solicitud/get`, soli);
  }
  postMensaje(msn:Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.baseURL}/solicitud/messageId`, msn);
  }


  getMensajeById(msn:Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.baseURL}/solicitud/message`, msn);
  }

public mandarImagen(message:any){
  /*
  this.socket.on('addimage',function(from,base64image){
    console.log('se supone volvio la imagen');
    $('.mensajes')
    .append(
        $('<p>').append($('<b>').text(msg),'<a target="_blank" href="'+ base64image + '"> <img src="'+base64image+'"/> </a>'
        )
        );
});

$(function(){
$("#imagefile").on('change',function(e){
var file = e.originalEvent.target.files[0];
var reader=new FileReader();
reader.onload=function(evt){
//enviar imagen resultante
this.socket.emit('user image',evt.target.result);
};
reader.readAsDataURL(file);
});
});

*/

}


  public getNewMessage = () => {
    this.socket.on('message', (message: any) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  emit(evento: string, payload?: any, callback?: any) {
    this.socket.emit(evento, payload, callback);
  }


/*
  socket.on('addimage',function(from,base64image){
    console.log('se supone volvio la imagen');
    $('.mensajes')
    .append(
        $('<p>').append($('<b>').text(msg),'<a target="_blank" href="'+ base64image + '"> <img src="'+base64image+'"/> </a>'
        )
        );
});

*/


  /*getMessages(){
    return this.listen('mensaje-nuevo');
  }

  listen(evento:string){
    return this.socket.fromEvent(evento);
  }*/

  cargarStorage() {
    if (sessionStorage.getItem('user')) {
      this.user = sessionStorage.getItem('cedula')!;
      console.log('Cargado');
      const payload = {
        nombre: this.user,
        room: this.user
      };
      this.loginWS(payload);
    }
  }

  loginWS(data: any) {

    return new Promise((resolve, reject) => {

      this.emit('configurar-usuario', data, () => {

        this.user = data.nombre;


      });
    });


  }


}
