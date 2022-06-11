import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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



}
