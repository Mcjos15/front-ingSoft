import {Component, NgModule, ViewChild,OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
@Component({
  selector: 'app-reporteria',
  templateUrl: './reporteria.component.html',
  styleUrls: ['./reporteria.component.css']
})
export class ReporteriaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  selected = 'option2';
  selectedCity: any;
  
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];
}
