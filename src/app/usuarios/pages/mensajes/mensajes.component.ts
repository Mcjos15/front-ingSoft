import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/users.interface';
import { DataTableDirective } from 'angular-datatables';
import { ChatService } from 'src/app/servicios/chat-service.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']

})
export class MensajesComponent  {
//107700164
  newMessage: string ='';
  messageList: string[] = [];

  constructor(private chatService: ChatService){

  }
  ngOnInit(){
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {

    console.log(this.newMessage);

    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

}
