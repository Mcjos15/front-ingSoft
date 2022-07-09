import { Component, Input, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Solicitud } from '../../interfaces/solicitud.interface';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../../../servicios/chat-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

//import {} from;

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  content: any;

  @Input() name: any;

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;
  @ViewChild('botonAbrir') botonAbrir!: ElementRef;
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  posts!: any;
  solicitud: Solicitud = {
    id: '',
    asunto: '',
    id_user: '',
    palabra: ''
  }
  constructor(private modalService: NgbModal, private chatService: ChatService,private router: Router,private route: ActivatedRoute) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25]
    };

    /*this.depaService.getDepas()
      .subscribe((posts:any) => {
        console.log(post)
        this.posts = posts['data'];

        this.dtTrigger.next(void 0);
      });*/



  }

  ngOnInit(): void {
    if (localStorage.getItem('id')) {
      this.solicitud.id_user = localStorage.getItem('id')!;
      this.chatService.getDepaById(this.solicitud)
        .subscribe((posts: any) => {
          console.log(posts);

          this.posts = posts['soli'];

          this.dtTrigger.next(void 0);
        });
    }
  }

  private abrirModal() {
    this.botonAbrir.nativeElement.click();
  }

  cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
  subirDButtonClick() {
    if (localStorage.getItem('id')) {
      this.solicitud.id_user = localStorage.getItem('id')!;

      this.chatService.postSolicitud(this.solicitud).subscribe(() => console.log(this.solicitud));
    }

  }
  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

alertSucces(){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Bienvendio al Chat',
    showConfirmButton: false,
    timer: 1500
  })


}

  entrarChat(id: string,asunto:string) {
    const room = id+'-'+asunto;
    this.chatService.createRoom(room);
    this.router.navigate(['../mensajes',room],{ relativeTo: this.route });
    //this.router.navigate(['home/mensajes'])
    this.alertSucces();
  }

}
