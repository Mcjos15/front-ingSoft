import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
    private router: Router) { }
  canActivate(): boolean {

    if (!this.loginService.isAuth()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;

  }

}
