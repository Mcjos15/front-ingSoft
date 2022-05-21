import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Authentication } from '../modelos/authentication.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  set2Authentication(auth: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(`${this.baseURL}/login`, auth);
  }

}
