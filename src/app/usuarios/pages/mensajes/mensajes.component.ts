import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/users.interface';
import { DataTableDirective } from 'angular-datatables';
import { ChatService } from 'src/app/servicios/chat-service.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html'

})
export class MensajesComponent  implements OnInit,OnDestroy{
//107700164
  newMessage: string ='';
  messageList: string[] = [];
  mensajeSubscription!:Subscription;

  constructor(private chatService: ChatService){

  }
  ngOnDestroy(): void {
    this.mensajeSubscription?.unsubscribe();
  }
  ngOnInit(){
    this.mensajeSubscription = this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    if(this.newMessage.length ===0){
      return;
    }

    console.log(this.newMessage);

    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

}
