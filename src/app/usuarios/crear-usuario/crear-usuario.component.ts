import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
//shared custom validators
import { ActivatedRoute } from '@angular/router';
//import { UserService } from '../services/user.service';
import { User } from '../interfaces/users.interface';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  usuarioForm: UntypedFormGroup | undefined;

  constructor(private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    /*private uService: UserService*/) { }


  //wachear esto de crear usuario form
  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: [''],
      primer_apellido: ['']

    })
/*
    this.route.paramMap.subscribe(params => {
      const usuId = params.get('id_usuario');
      if (usuId) {
        this.getUsuario(usuId);

      }

    });

 */
  }
 
  /*
  getUsuario(id_usuario: User) {

    this.uService.getUserById(id_usuario).subscribe(
      (usuario: User) => this.editUsuario(usuario),
      (err: any) => console.log(err)
    );

  }
  */

  //pre relleno
  /*
  editUsuario(usuario: User) {
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      primer_apellido: usuario.primer_apellido

    })

  }
*/

}
