import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../interfaces/users.interface';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
  
})
export class MensajesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
