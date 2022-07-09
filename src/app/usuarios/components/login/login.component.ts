import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/users.interface';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms'
import { ApiService } from '../../../servicios/api.service';
import { LoginI } from '../../../modelos/login.interface';
import { LoginService } from 'src/app/servicios/login.service';
import { Authentication } from '../../../modelos/authentication.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    cedula: '',
    id_sexo: ''
  };
  logIn: LoginI = {
    cedula: '',
    password: ''
  }
  auth: Authentication = {
    ascii: '',
    otpauth_url: 'string',
    token: 'string',
    logIn: this.logIn
  }
  public myAngularxQrCode: string = '';


  focus: any;
  focus1: any;
  // validators del log in
  loginForm = new UntypedFormGroup({
    cedula: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required)

  })
  tokenForm = new UntypedFormGroup({
    token: new UntypedFormControl('', Validators.required)

  })



  constructor(private userService: UserService, private api: ApiService
    , private loginService: LoginService,private router: Router) {

  }

  ngOnInit(): void {

  }

  alertWithSuccess(){  
    Swal.fire('Gracias...', 'Usted se Logeo exitosamente!', 'success')  
  } 

  topend()  
  {  
    Swal.fire({  
      position: 'top-end',  
      icon: 'success',  
      title: 'Usted se Logeo exitosamente!',  
      showConfirmButton: false,
      customClass: {
        validationMessage: 'my-validation-message'
      },
      preConfirm: (cedula) => {
        if (!cedula) {
          Swal.showValidationMessage(
            '<i class="fa fa-info-circle"></i> Ingrese datos erroneamente'
          )
        }
      },
    
      timer: 1500  
    })  
  }  

  showError(){

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    
  }

  search() {
    if (this.user) {
      this.userService.getUserByCedula(this.user)
        .subscribe(data => this.user = data);
      console.log(this.user);
    }
  }

  onLogin(form: LoginI) {
    //console.log(form);
    if(form.cedula.length > 3 && form.password.length > 3){

    
    this.api.loginByCed(form).subscribe(data => {
      if (data.user) {
        this.logIn.cedula = form.cedula;
        this.logIn.password = form.password;
        this.user = data.user;

        sessionStorage.setItem('user',this.user.nombre);
        sessionStorage.setItem('cedula',this.user.cedula);
        localStorage.setItem('user',this.user.nombre);
        localStorage.setItem('cedula',this.user.cedula);
        localStorage.setItem('id',this.user.id_usuario!.toString());
        this.auth.ascii = data.authentication.ascii;
        this.myAngularxQrCode = data.img;
        //this.myAngularxQrCode = data.authentication.otpauth_url;
        console.log(data.token);
        //esto lo tenenemos que guardar en el metodo de "sendToken", lo hacemos aca porque
        //la doble autenticascion nos quita demasiado tiempo, entonces de momento la anulamos.
        localStorage.setItem('token',data.token);
        this.router.navigate(['home']);
      }
    })
  } else {
    this.showError();


  }
  }

  sendToken(token: string) {

    if (token.length !== 0) {
      this.auth.token = token;
      this.loginService.set2Authentication(this.auth).subscribe(data => {

        localStorage.setItem('token',data.token);
        this.router.navigate(['home']);

      });
    }
  }

}
