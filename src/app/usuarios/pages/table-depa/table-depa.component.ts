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

  provincias:Provincia[] =[];
  cantones:Canton[] =[];

  constructor(private depaService: DepaService,
    private _router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25]
    };

    this.depaService.getProvincias().subscribe((data)=>{
      this.provincias =data.provincias;

    });

    this.depaService.getDepas()
      .subscribe((posts:any) => {
        this.posts = posts['data'];


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
