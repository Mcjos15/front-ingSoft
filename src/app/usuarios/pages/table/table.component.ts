import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/users.interface';
import { DataTableDirective } from 'angular-datatables';
declare var $: any;
@Component({
  selector: 'app-listar',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnDestroy {



  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  posts!: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  persona:User ={
    cedula:'',
    id_usuario: 0,
  nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  id_sexo: '',
  password:'',
  active :''
  }

  constructor(private userService: UserService,
    private _router:Router,private route: ActivatedRoute,public _location: Location) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25],
      responsive: true
    };

    this.userService.getUsers()
      .subscribe((posts:any) => {

        console.log(posts['data']);
        this.posts = posts['data'];

        this.dtTrigger.next(void 0);
      });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
// revisar si el formato de editar/:id esta correcto
  editarButtonClick(id_usuario:User){

this._router.navigate(['../editar',id_usuario],{ relativeTo: this.route });


  }

  reload(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.userService.getUsers()
    .subscribe((data:any) => {
        this.posts =data['data'];
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(this.posts);
      });
    });
  }

  deleteButtonClick(id_usuario:number){

    this.persona.id_usuario = id_usuario;

   this.userService.deleteUser(this.persona)
   .subscribe((res:any)=>{

    /*this._router.navigateByUrl("/listar", { skipLocationChange: true }).then(() => {
      console.log(decodeURI(this._location.path()));
      this._router.navigate([decodeURI(this._location.path())]);
      });*/
    console.log(res);

   });
   this.reload();


      }


}





