import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/users.interface';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import {ApiService } from '../../../servicios/api.service';
import {LoginI} from '../../../modelos/login.interface';
import { data } from 'jquery';



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

  focus: any;
  focus1: any;
// validators del log in
loginForm= new FormGroup({
cedula: new FormControl('',Validators.required),
password: new FormControl('',Validators.required)

})



  constructor(private userService: UserService,private api:ApiService) { }

  ngOnInit(): void {
  }


  
  search() {
    if (this.user) {
      this.userService.getUserById(this.user)
      .subscribe(data => this.user = data);
      console.log(this.user);
    }
  }
  
  onLogin(form: LoginI){

this.api.loginByCed(form).subscribe(data =>{
//console.log(data);
})

  }



}
