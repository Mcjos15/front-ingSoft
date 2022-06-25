import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/users.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  sexo:string ='';
  active:string = '';
  persona:User ={
    cedula:'',
    id_usuario: 0,
  nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  id_sexo: '',
  password:'',
  active:''
  }

  EditForm = new UntypedFormGroup({
    cedula: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required)

  })

  constructor(private route: ActivatedRoute,private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.persona.id_usuario = params['id'];
        this.userService.getUserById(this.persona).subscribe((res:any) => {
          this.persona = res.user;


          console.log(this.persona.active);
          if(this.persona.active != null){
            this.active = '1';
          }else{
            this.active ='0';
          }


          this.sexo = this.persona.id_sexo!;


    });
      });
    }


    onUpdate(form:EditForm){
      /*this.persona.nombre = form.nombre;
      this.persona.primer_apellido = form.primer_apellido;
      this.persona.segundo_apellido = form.segundo_apellido;
      this.persona.password = form.password;
      this.persona.id_sexo = form.id_sexo;*/

      this.persona.id_sexo = this.sexo;
      this.persona.active = this.active;

      console.log(this.persona.active);

      this.userService.editUser(this.persona).subscribe(() =>  this.router.navigate(['home/listar']));

      //console.log(this.persona);
      //this.router.navigate(['../listar']);

    }
}
interface EditForm {
  nombre: string;
  primer_apellido:string;
  segundo_apellido:string;
  password:string;
  id_sexo:string
}
