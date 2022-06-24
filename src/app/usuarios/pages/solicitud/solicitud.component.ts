import { Component, Input,ElementRef, OnInit, ViewChild } from '@angular/core';

import { Solicitud } from '../../interfaces/solicitud.interface';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  @Input() name: any;

  @ViewChild('botonCerrar') botonCerrar!:ElementRef;
  @ViewChild('botonAbrir') botonAbrir!:ElementRef;
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  posts!: any;
  solicitud:Solicitud ={
    id:'',
    tema:''
  }
  constructor() {
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
  }

  private abrirModal(){
    this.botonAbrir.nativeElement.click();
  }

  cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
  subirDButtonClick(){
  }


}
