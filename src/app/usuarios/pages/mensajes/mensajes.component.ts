import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/users.interface';
import { ChatService } from 'src/app/servicios/chat-service.service';
import {DomSanitizer,SafeHtml,SafeUrl,SafeStyle} from '@angular/platform-browser';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html'

})
export class MensajesComponent  implements OnInit,OnDestroy{
//107700164
  newMessage: string ='';
  currVerifiedLoanOfficerPhoto:any;


  messageList: string[] = [];
  mensajeSubscription!:Subscription;
  type='file';
  link:any;
  files: any;
  rawFiles:any;
  event:Event|any;
  arrayLink: Array<any> = [];
  dire:string="";
  bas:string="";
  imglist: string[]=[];
newArray: any[]=[];
  //sanitizer: any;
  constructor(private chatService: ChatService,private sanitization:DomSanitizer ){

  }
  ngOnDestroy(): void {
    this.mensajeSubscription?.unsubscribe();
  }
  ngOnInit(){
    this.mensajeSubscription = this.chatService.getNewMessage().subscribe((message: any) => {
      this.messageList.push(message);
      //this.chatService.createRoom(localStorage.getItem('cedula')!);
    })
  }

  sendMessage() {
    console.log(this.messageList)
    if(this.newMessage.length ===0){
      return;
    }

    console.log(this.newMessage);

    this.chatService.sendMessage(this.newMessage,localStorage.getItem('cedula')!);
    this.newMessage = '';

    console.log(this.messageList);
  }

  sendImg(){
console.log('dentro');
  }

  onFileChanges(event:Event){
   var base: string|any;
   // const target= event.target as HTMLInputElement;
    console.log(event);
    //base=event[0];
    console.log('la base'+base);
  }


  CreateBase64String(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      //var bas:string
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
         // this.cardImageBase64 = imgBase64Path;
      //    this.isImageSaved = true;
          console.log(imgBase64Path);
          this.bas=imgBase64Path;
          console.log(this.bas);
        };
      };
      this.chatService.sendMessage(this.bas,'');
      reader.readAsDataURL(fileInput.target.files[0]);
    }
//bas=fileInput.files[0];
//this.currVerifiedLoanOfficerPhoto =(this.sanitization.bypassSecurityTrustResourceUrl(this.bas)as any).changingThisBreaksApplicationSecurity;
;
  }






  test(message:any){
    //console.log("esta picha entro") aqui no paso nada
    const value =(this.sanitization.bypassSecurityTrustResourceUrl(message)as any).changingThisBreaksApplicationSecurity;
return value;
  }

}
