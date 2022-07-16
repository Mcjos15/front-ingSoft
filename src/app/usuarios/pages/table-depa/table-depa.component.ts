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
import { Provincia } from '../../interfaces/provincias.interface';
import { Canton } from '../../interfaces/cantones.interface';
import { DataTableDirective } from 'angular-datatables';
import { ConfirmDialogModel,ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table-depa',
  templateUrl: './table-depa.component.html',
  styleUrls: ['./table-depa.component.css']
})
export class TableDepaComponent implements OnInit, OnDestroy {


  result: string = '';
  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  posts!: any;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  provincias:Provincia[] =[];
  cantones:Canton[] =[];

  constructor(private depaService: DepaService,
    private _router:Router,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25],
      responsive: true
    };

    this.depaService.getProvincias().subscribe((data)=>{
      this.provincias =data.provincias;

    });

    this.depaService.getDepas()
      .subscribe((posts:any) => {
        this.posts = posts['data'];


        this.cambiarData();
       /* console.log(this.provincias.find((data)=>{
          if(data.id_provincia ===this.posts.id_provincia){
            return this.posts.id_provincia
          }
          return  this.posts.find((dataP:any)=>{
            console.log(dataP.id_provincia);
          });
        }));*/

        this.dtTrigger.next(void 0);
      });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  cambiarData(){
    this.provincias.filter(data=>{
      this.posts.find((dataP:any)=>{

        if(dataP.id_provincia ==data.id_provincia){
          dataP.id_provincia = data.descripcion;

          this.depaService.getCantones(data)
          .subscribe((cantones)=>{

            cantones.cantones.find((cantonesData:any)=>{

              this.posts.find((dataP:any)=>{

                if(cantonesData.id_canton == dataP.id_canton){

                  const newCanton:Canton ={
                    descripcion:'',
                    id_canton:cantonesData.id_canton,
                    id_provincia:data.id_provincia!
                  }
                  dataP.id_canton = cantonesData.descripcion;

                  console.log(newCanton);
                  this.depaService.getDistritos(newCanton).subscribe((distritos)=>{
                    distritos.distritos.find((dataDistritos:any)=>{
                      this.posts.find((dataP:any)=>{
                        if(dataDistritos.id_distrito == dataP.id_distrito){
                          dataP.id_distrito = dataDistritos.descripcion;
                        }
                      });
                    })
                  })
                }
              });

            })
          })
        }

      });



    })
  }
// revisar si el formato de editar/:id esta correcto
editarDButtonClick(id_departamento:Depa){

  console.log( {relativeTo: this.route});
this._router.navigate(['../editar',id_departamento],{ relativeTo: this.route });


}
agregarDButtonClick(){
this._router.navigate(['../agregarDep'],{relativeTo:this.route});

}
warnAlert(id:any){

  const depa:Depa ={
    id_departamento:id,
    descripcion:''
  }

  this.depaService.delete(depa).subscribe(()=>{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Eliminado exitosamente!',

    })
  });
  this.reload();


}
reload(){

  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();

    this.depaService.getProvincias().subscribe((data)=>{
      this.provincias =data.provincias;

    });
    this.depaService.getDepas()
    .subscribe((posts:any) => {
      this.posts = posts['data'];


      this.cambiarData();

      console.log('Faack');

      this.dtTrigger.next(this.posts);
    });

  });
}
confirmDialog(id:any): void {
  const message = `Do you want to save this file?`;

  const dialogData = new ConfirmDialogModel("File Saving Message", message);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "600px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;

    if(this.result){
      this.warnAlert(id)

    }
  });
}
}
