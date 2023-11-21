// session.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private isLoggedIn: boolean = false;

  constructor() {}

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Método para iniciar sesión
  login() {
    this.isLoggedIn = true;
  }

  // Método para cerrar sesión
  logout() {
    this.isLoggedIn = false;
  }
}
