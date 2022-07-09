import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //Los Guards sirven para, de manera más sencilla, controlar a donde quiere dirigirse el usuario
  //y desviarlo si no cumple con una condición dada.
  //Los guards se tienen que agregar en app.module.ts

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAuthenticated()) {
        //Para saber si esta expirado también se puede crear otro Guard, pero para hacer el ejemplo se hace todo en uno
        if (this.isTokenExpirado()) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
  isTokenExpirado(): boolean {
    let token = this.authService.token;
    let payload = this.authService.obtenerPayload(token);
    let now = new Date().getTime() / 1000; //Fecha actual en segundos
    return payload.exp < now; //exp es la fecha de expiración. Si es menor a la fecha actual, expiró
  }
}
