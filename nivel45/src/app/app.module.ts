import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ObrasComponent } from './obras/obras.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AddAnticipoComponent } from './add-anticipo/add-anticipo.component';
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
import { AddObraComponent } from './add-obra/add-obra.component';
import { AddEmpleadoComponent } from './add-empleado/add-empleado.component';
import { PagarRolComponent } from './pagar-rol/pagar-rol.component';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebcamModule } from 'ngx-webcam';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    ObrasComponent,
    ContactoComponent,
    AddAnticipoComponent,
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
    AddObraComponent,
    AddEmpleadoComponent,
    PagarRolComponent,
    AddProductoComponent,
    ListaProductosComponent,
    ListaEmpleadosComponent,
    LoginComponent,
    AddClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    WebcamModule,
    ZXingScannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
