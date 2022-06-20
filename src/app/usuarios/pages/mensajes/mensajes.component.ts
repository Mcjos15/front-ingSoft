import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/users.interface';
import { DataTableDirective } from 'angular-datatables';
import { ChatService } from 'src/app/servicios/chat-service.service';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html'

})
<<<<<<< Updated upstream
export class MensajesComponent  implements OnInit,OnDestroy{
//107700164
  newMessage: string ='';
  messageList: string[] = [];
  mensajeSubscription!:Subscription;

=======
export class MensajesComponent implements OnInit {
//107700164
  newMessage: string ='';
  messageList: string[] = [];
  type='file';
  link:any;
  files: any;
  rawFiles:any;
  arrayLink: Array<any> = [];
  dire:string="";
newArray: any[]=[];
>>>>>>> Stashed changes
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

  sendImg(){
console.log('dentro');
  }

  onFileChanges(event:Event){
    const target= event.target as HTMLInputElement;
    //let fileList: FileList | null = element.files;
//const files = target.files as FileList;
    console.log(event);
    //console.log("tarjet",target);

/*if(fileList){
console.log("FileUpload -> files",fileList)

    }
    */
    console.log('sawardo');
    //console.log("File changed::",files);
    //this.dire=files[0].base64
    //console.log("Raw Files ::", this.rawFiles);
  }

  test(){
    console.log("esta picha entro")
this.link=this.files[0].base64;
this.newArray.push(this.link);
console.log("This newArray ::", this.newArray);
  }

}
