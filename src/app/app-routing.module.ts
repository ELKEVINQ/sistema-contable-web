import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ObrasComponent } from './obras/obras.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'obras', component: ObrasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  // Otras rutas si es necesario
  { path: '**', redirectTo: 'inicio' } // Redirige a "inicio" si la ruta no coincide con ninguna
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
