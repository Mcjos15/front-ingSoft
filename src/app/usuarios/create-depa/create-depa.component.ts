import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Depa } from '../interfaces/dep.interface';
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



  constructor(private route: ActivatedRoute,private depaService: DepaService,private router: Router) { }

  ngOnInit(): void {
  }

  subirDButtonClick(){

    this.depaService.postDepa(this.departamento).subscribe(() =>  this.router.navigate(['home/departamento']));


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

}
