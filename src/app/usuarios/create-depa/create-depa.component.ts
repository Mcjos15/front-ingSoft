import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Canton } from '../interfaces/cantones.interface';
import { Depa } from '../interfaces/dep.interface';
import { Distritos } from '../interfaces/distritos.interface';
import { Provincia } from '../interfaces/provincias.interface';
import { DepaService } from '../services/depa.service';

@Component({
  selector: 'app-create-depa',
  templateUrl: './create-depa.component.html',
  styleUrls: ['./create-depa.component.css']
})
export class CreateDepaComponent implements OnInit {
  departamento:Depa ={
    descripcion: ''
  }

  provincias:Provincia[] = [];
  cantones:Canton[] =[];
  distritos:Distritos[]=[];

  canton!:Canton;

  provincia!:Provincia;

  distrito!:Distritos;


  constructor(private route: ActivatedRoute,private depaService: DepaService,private router: Router) { }

   ngOnInit() {

     this.depaService.getProvincias().subscribe((provincias)=>{

      this.provincias = provincias.provincias;



    });
  }

  subirDButtonClick(){

    if(this.distrito && this.provincia && this.canton){
      this.departamento.id_canton = this.canton.id_canton;
      this.departamento.id_distrito = this.distrito.id_distrito;
      this.departamento.id_provincia = this.provincia.id_provincia;
      this.depaService.postDepa(this.departamento).subscribe(() =>  this.router.navigate(['home/departamento']));

    }





  }

  alertaSubmit(){
    Swal.fire({
      title: 'Se a Agregado Exitosamente.',
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    })






  }

  change(p:Provincia){

    this.depaService.getCantones(p).subscribe((data)=>{
      this.cantones = data.cantones;
    });


  }

  changeCanton(canton:Canton){

    this.canton.id_provincia = this.provincia.id_provincia!;

    this.depaService.getDistritos(this.canton).subscribe((data)=>{
     this.distritos = data.distritos;
    });

  }

}
