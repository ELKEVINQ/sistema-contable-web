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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddAnticipoComponent } from './add-anticipo/add-anticipo.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { AddObraComponent } from './add-obra/add-obra.component';
import { AddProveedorComponent } from './add-proveedor/add-proveedor.component';
import { ListaAnticiposComponent } from './lista-anticipos/lista-anticipos.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ListaFacturasComponent } from './lista-facturas/lista-facturas.component';
import { ListaObrasComponent } from './lista-obras/lista-obras.component';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { RegistrarCompraComponent } from './registrar-compra/registrar-compra.component';
import { RegistrarFacturaCompraComponent } from './registrar-factura-compra/registrar-factura-compra.component';
import { RegistroGeneralComponent } from './registro-general/registro-general.component';
import { FacturarComponent } from './facturar/facturar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEmpleadoComponent } from './add-empleado/add-empleado.component';
import { PagarRolComponent } from './pagar-rol/pagar-rol.component';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PdfComponent } from './pdf/pdf.component';
import { WebcamModule } from 'ngx-webcam';

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
    AddAnticipoComponent,
    AddClienteComponent,
    AddObraComponent,
    AddProveedorComponent,
    ListaAnticiposComponent,
    ListaClientesComponent,
    ListaFacturasComponent,
    ListaObrasComponent,
    ListaProveedoresComponent,
    RegistrarCompraComponent,
    RegistrarFacturaCompraComponent,
    RegistroGeneralComponent,
    FacturarComponent,
    AddEmpleadoComponent,
    PagarRolComponent,
    AddProductoComponent,
    ListaProductosComponent,
    ListaEmpleadosComponent,
    PdfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    QRCodeModule,
    WebcamModule,
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
