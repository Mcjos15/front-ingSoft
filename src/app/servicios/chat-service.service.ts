import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public socketStatus = false;
  private socket: any;
  private user!: string;
  constructor() {
    this.socket = io('http://localhost:8080');
    this.cargarStorage();
    this.checkStatus();
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
  public sendMessage(message: any) {

    const payload = {
      de: sessionStorage.getItem('user'),
      cuerpo: message
    };

    this.socket.emit('message', payload);
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
      this.user = sessionStorage.getItem('user')!;
      console.log(this.user);
      this.loginWS(this.user);
    }
  }

  loginWS(nombre: string) {



    this.emit('configurar-usuario', nombre, () => {

      this.user = nombre;


    });


  }

}
