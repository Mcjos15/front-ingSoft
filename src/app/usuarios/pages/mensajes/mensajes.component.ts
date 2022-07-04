import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/users.interface';
import { ChatService } from 'src/app/servicios/chat-service.service';
import { DomSanitizer, SafeHtml, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { Mensaje } from '../../interfaces/mensajes.interface';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',

  styleUrls: ['./mensajes.component.css']

})
export class MensajesComponent implements OnInit, OnDestroy {

  //107700164
  newMessage: Mensaje = {
    asunto: '',
    de: ''
  };
  currVerifiedLoanOfficerPhoto: any;

  user: string = '';

  room: string = '';

  messageList: Mensaje[] = [];
  mensajeSubscription!: Subscription;
  type = 'file';
  link: any;
  files: any;
  rawFiles: any;
  event: Event | any;
  arrayLink: Array<any> = [];
  dire: string = "";
  bas: string = "";
  imglist: string[] = [];
  newArray: any[] = [];

  mensaje: any;
  //sanitizer: any;
  constructor(private chatService: ChatService, private sanitization: DomSanitizer, private route: ActivatedRoute, private router: Router) {

  }
  ngOnDestroy(): void {
    this.mensajeSubscription?.unsubscribe();
  }
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.room = params['id'];
      this.newMessage.id_solicitud = this.room.split('-')[0];
      this.chatService.getMensajeById(this.newMessage)
        .subscribe((res: any) => {

          console.log(res.mensajes);
          if (res.mensajes.length) {


            for (let i = 0; i < res.mensajes.length; i++) {

              this.messageList.push({
                asunto: res.mensajes[i].asunto,
                de: res.mensajes[i].nombre_persona
              });
            }
            console.log(this.messageList);
          }

        }
        );

      // this.chatService.createRoom(this.room);
    });
    this.mensajeSubscription = this.chatService.getNewMessage().subscribe((message: any) => {

      this.user = localStorage.getItem('user')!;
      if (message) {

        this.mensaje = JSON.parse(message);
        this.messageList.push({
          asunto: this.mensaje.cuerpo,
          de: this.mensaje.de
        });
        console.log(this.mensaje.de);
      }

    })

  }

  sendMessage() {
    console.log(this.messageList)
    if (this.newMessage.asunto.length === 0) {
      return;
    }

    this.newMessage.de = this.user;


    this.chatService.sendMessage(this.newMessage.asunto, this.room);
    this.chatService.postMensaje(this.newMessage).subscribe(() => this.newMessage = {
      asunto: '',
      de: ''
    });


    console.log(this.messageList);
  }

  sendImg() {
    console.log('dentro');
  }

  onFileChanges(event: Event) {
    var base: string | any;
    // const target= event.target as HTMLInputElement;
    console.log(event);
    //base=event[0];
    console.log('la base' + base);
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
          this.bas = imgBase64Path;
          console.log(this.bas);
        };
      };
      this.chatService.sendMessage(this.bas, this.room);
      this.newMessage.de = this.user;
      this.newMessage.asunto = this.bas;
      this.newMessage.id_solicitud = this.room.split('-')[0];

      this.chatService.postMensaje(this.newMessage).subscribe(() => this.newMessage = {
        asunto: '',
        de: ''
      });
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    //bas=fileInput.files[0];
    //this.currVerifiedLoanOfficerPhoto =(this.sanitization.bypassSecurityTrustResourceUrl(this.bas)as any).changingThisBreaksApplicationSecurity;
    ;
  }






  test(message: any) {
    //console.log("esta picha entro") aqui no paso nada
    const value = (this.sanitization.bypassSecurityTrustResourceUrl(message) as any).changingThisBreaksApplicationSecurity;
    return value;
  }

  scrollTheLastElementbyClassName() {

    let elements = document.getElementsByClassName('msj');
    let ultimo: any = elements[elements.length - 1];
    let toppos = ultimo.offsetTop;


    const output = document.getElementById('contenedorMensajes');
    if (output) {
      output.scrollTop = toppos;
    }

  }
}
