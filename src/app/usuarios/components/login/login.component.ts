import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/users.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from '../../../servicios/api.service';
import { LoginI } from '../../../modelos/login.interface';
import { LoginService } from 'src/app/servicios/login.service';
import { Authentication } from '../../../modelos/authentication.interface';


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
  auth: Authentication = {
    ascii: '',
    otpauth_url: 'string',
    token: 'string'
  }
  public myAngularxQrCode: string = '';


  focus: any;
  focus1: any;
  // validators del log in
  loginForm = new FormGroup({
    cedula: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  })
  tokenForm = new FormGroup({
    token: new FormControl('', Validators.required)

  })



  constructor(private userService: UserService, private api: ApiService
    , private loginService: LoginService) {
  }

  ngOnInit(): void {

  }



  search() {
    if (this.user) {
      this.userService.getUserById(this.user)
        .subscribe(data => this.user = data);
      console.log(this.user);
    }
  }

  onLogin(form: LoginI) {

    this.api.loginByCed(form).subscribe(data => {
      if (data.user) {
        this.user = data.user;

        this.auth.ascii = data.authentication.ascii;
        this.myAngularxQrCode = data.img;
        //this.myAngularxQrCode = data.authentication.otpauth_url;
        console.log(data);
      }
    })

  }

  sendToken(token: string) {

    if (token.length !== 0) {
      this.auth.token = token;
      this.loginService.set2Authentication(this.auth).subscribe(data => {
        console.log(data);
      });
    }
  }

}
