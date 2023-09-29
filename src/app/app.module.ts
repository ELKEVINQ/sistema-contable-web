import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ObrasComponent } from './obras/obras.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    InicioComponent,
    NosotrosComponent,
    ObrasComponent,
    ContactoComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent, FooterComponent, NavbarComponent],
})
export class AppModule {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyB4M__S8c4v80eKjd39x-SS_xFz2MBfYeA",
      authDomain: "nivel45web.firebaseapp.com",
      projectId: "nivel45web",
      storageBucket: "nivel45web.appspot.com",
      messagingSenderId: "292397409852",
      appId: "1:292397409852:web:5b01b3660015ac20794539",
      measurementId: "G-WCWPQYX5WP"
    };
  }
}
