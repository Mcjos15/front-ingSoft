import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { DepaService } from '../../services/depa.service';
import {Router,ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/users.interface';
import {Depa} from '../../interfaces/dep.interface';
import { post } from 'jquery';
import Swal from 'sweetalert2';


declare var $: any;
@Component({
  selector: 'app-table-depa',
  templateUrl: './table-depa.component.html',
  styleUrls: ['./table-depa.component.css']
})
export class TableDepaComponent implements OnInit, OnDestroy {

  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  posts!: any;

  constructor(private depaService: DepaService,
    private _router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25]
    };

    this.depaService.getDepas()
      .subscribe((posts:any) => {
        console.log(post)
        this.posts = posts['data'];

        this.dtTrigger.next(void 0);
      });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
// revisar si el formato de editar/:id esta correcto
editarDButtonClick(id_departamento:Depa){

  console.log( {relativeTo: this.route});
this._router.navigate(['../editar',id_departamento],{ relativeTo: this.route });


}
agregarDButtonClick(){
this._router.navigate(['../agregarDep'],{relativeTo:this.route});

}
warnAlert(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Eliminado exitosamente!',
  
  })


}


}
