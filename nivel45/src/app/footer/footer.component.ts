import { Component } from '@angular/core';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private sessionService: SessionService, ) {}

  isAuthenticated(): boolean {
    return this.sessionService.isAuthenticated();
  }
  
  get sessionServicePublic(): SessionService {
    return this.sessionService;
  }
}
