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

  public getNewMessage = () => {
    this.socket.on('message', (message: any) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  emit(evento: string, payload?: any, callback?: any) {
    this.socket.emit(evento, payload, callback);
  }

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
