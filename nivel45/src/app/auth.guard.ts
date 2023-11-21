import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './services/session/session.service';  // Asegúrate de importar el servicio correctamente

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sessionService.isAuthenticated()) {
      return true;
    } else {
      // Redirige a la página de inicio de sesión si el usuario no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
