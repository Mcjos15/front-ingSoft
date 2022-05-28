import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Authentication } from '../modelos/authentication.interface';
import { Observable } from 'rxjs';
import { User } from '../usuarios/interfaces/users.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  set2Authentication(auth: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(`${this.baseURL}/login`, auth);
  }



  isAuth(): boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService ();
    if (helper.isTokenExpired(token!) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }
}
