import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Nivel 45';
  @ViewChild('mainContent') mainContent!: ElementRef;
  footerInRelativePosition = false;

  constructor(private router: Router) {
    // Suscribirse al evento NavigationEnd
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkFooterPosition();
        this.checkFooterPositionWithDelay();
      });
  }

  ngAfterViewInit() {
    // Espera a que se cargue completamente la página antes de verificar el footer
    window.addEventListener('DOMContentLoaded', () => {
      this.checkFooterPositionWithDelay();
    });

    // También verifica el footer en cambios de tamaño de ventana
    window.addEventListener('resize', () => {
      this.checkFooterPositionWithDelay();
    });
  }

  checkFooterPosition() {
    const nav = document.querySelector(".na") as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;
    const main = document.querySelector('.main') as HTMLElement;

    const updateFooter = () => {
      const windowHeight = window.innerHeight;
      const navHeight = nav.offsetHeight;
      const mainHeight = main.offsetHeight;
      const footerHeight = footer.offsetHeight;
      const mainBottom = main.getBoundingClientRect().bottom; // Distancia desde la parte inferior de .main
      const footerBottom = footer.getBoundingClientRect().bottom; // Distancia desde la parte inferior de .footer
      const totalContentHeight = mainHeight + footerHeight + navHeight; // Tamaño total del contenido de la página

      if (mainBottom - footerHeight != 0 && mainBottom > totalContentHeight) {
        footer.style.position = 'fixed';
      } else {
        if (footerBottom > footerHeight && totalContentHeight < windowHeight) {
          footer.style.position = 'fixed';
        } else {
          footer.style.position = 'relative';
        }
      }
    };

    // Llamamos a la función al cargar la página
    updateFooter();
  }

  checkFooterPositionWithDelay() {
    // Agrega un retraso de 0.2 segundos antes de verificar el footer
    setTimeout(() => {
      this.checkFooterPosition();
    }, 200);
  }
}
