
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseURL: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`);
  }

  getUserByCedula(user:User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/users`, user);
  }
  getUserById(user:User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/users/search`, user);
  }
  editUser(user:User): Observable<User>{
    return this.http.put<User>(`${this.baseURL}/users`, user);
  }

  deleteUser(user:User): Observable<User>{
    return this.http.post<User>(`${this.baseURL}/users/delete`, user);
  }


}
