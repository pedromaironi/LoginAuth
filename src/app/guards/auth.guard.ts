import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService,
               private router: Router) {
  }
  // next: ActivatedRouteSnapshot,
    // Siguiente pagina a la que la el usuario quiere dirigirse
  // tslint:disable-next-line: align
  canActivate(): boolean {
    console.log('Guards');
    if (this.auth.EstaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/registro');
      return false;
    }
  }

}
