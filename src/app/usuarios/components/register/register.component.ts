import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  focus: any;
  focus1: any;
  focus2: any;
  User: any = ['Super Admin', 'Author', 'Reader'];

  constructor() { }

  ngOnInit(): void {
  }

}
