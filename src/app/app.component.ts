import { Component, OnInit } from '@angular/core';
import { isWindow } from 'jquery';
import { ChatService } from './servicios/chat-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'front-ingSoft';

  constructor(public chatService:ChatService){}


  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }



}
