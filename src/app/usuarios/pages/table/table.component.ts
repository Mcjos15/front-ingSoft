import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import {Router } from '@angular/router';
import { User } from '../../interfaces/users.interface';
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

  constructor(private userService: UserService,
    private _router:Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25]
    };

    this.userService.getUsers()
      .subscribe((posts:any) => {
        this.posts = posts['data'];

        this.dtTrigger.next(void 0);
      });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
// revisar si el formato de editar/:id esta correcto
  editarButtonClick(id_usuario:User){
this._router.navigate(['/editar/',id_usuario]);


  } 


}






export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
