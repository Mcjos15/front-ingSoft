
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depa } from '../interfaces/dep.interface';


@Injectable({
  providedIn: 'root'
})
export class DepaService {


  private baseURL: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getDepas(): Observable<Depa[]> {
    return this.http.get<Depa[]>(`${this.baseURL}/departamento`);
  }



  getDepaById(depa:Depa): Observable<Depa> {
    return this.http.post<Depa>(`${this.baseURL}/departamento`, depa);
  }
}
