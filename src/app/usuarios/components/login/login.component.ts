import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/users.interface';

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
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  search() {
    if (this.user) {
      this.userService.getUserById(this.user)
      .subscribe(data => this.user = data);
      console.log(this.user);
    }
  }
}
