import {Injectable} from "@angular/core";
import { LoginI } from "../modelos/login.interface";
import {ResponseI } from "../modelos/response.interface";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({

providedIn: 'root'
})
export class ApiService{

// de aqui tomamos todos los datos de la API
  url:string ="http://localhost:8080/api/users";

constructor(private http:HttpClient){}


loginByCed(form:LoginI):Observable<ResponseI>{
    // deberia ser /login , pero vamo a dejar un checkpoint vacio
    let direccion = this.url + ""
    
    return this.http.post<ResponseI>(direccion,form)
}

}