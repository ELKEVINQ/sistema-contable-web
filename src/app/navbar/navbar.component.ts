// navbar.component.ts
import { Component } from '@angular/core';
import { SessionService } from '../services/session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private sessionService: SessionService, private router: Router) {}

  // Getter público para acceder a sessionService desde la plantilla HTML
  get sessionServicePublic(): SessionService {
    return this.sessionService;
  }

  isAuthenticated(): boolean {
    return this.sessionService.isAuthenticated();
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
