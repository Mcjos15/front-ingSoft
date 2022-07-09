
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depa } from '../interfaces/dep.interface';
import { Provincia } from '../interfaces/provincias.interface';


@Injectable({
  providedIn: 'root'
})
export class DepaService {


  private baseURL: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getDepas(): Observable<Depa[]> {
    return this.http.get<Depa[]>(`${this.baseURL}/departamento`);
  }

  postDepa(depa:Depa): Observable<Depa> {
    return this.http.post<Depa>(`${this.baseURL}/departamento`, depa);
  }


  getDepaById(depa:Depa): Observable<Depa> {
    return this.http.post<Depa>(`${this.baseURL}/departamento`, depa);
  }

  getProvincias():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/departamento/provincias`);
  }

  getCantones(provincia:any):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/departamento/cantones`,provincia);
  }

  getDistritos(canton:any):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/departamento/distritos`,canton);
  }
  delete(depa:Depa):Observable<Depa>{
    return this.http.post<Depa>(`${this.baseURL}/departamento/delete`,depa);
  }
}
