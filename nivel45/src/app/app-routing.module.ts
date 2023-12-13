import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ObrasComponent } from './obras/obras.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
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
import { AuthGuard } from './auth.guard';
import { FacturarComponent } from './facturar/facturar.component';
import { AddObraComponent } from './add-obra/add-obra.component';
import { AddEmpleadoComponent } from './add-empleado/add-empleado.component';
import { PagarRolComponent } from './pagar-rol/pagar-rol.component';
import { AddProductoComponent } from './add-producto/add-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'obras', component: ObrasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'p',  // Preruta
    canActivate: [AuthGuard],  // Aplica el guardia a esta ruta principal
    children: [
      { path: 'add-anticipo', component: AddAnticipoComponent },
      { path: 'add-cliente', component: AddClienteComponent },
      { path: 'add-obra', component: AddObraComponent },
      { path: 'add-producto', component: AddProductoComponent },
      { path: 'add-proveedor', component: AddProveedorComponent },
      { path: 'add-empleado', component: AddEmpleadoComponent },
      { path: 'editar-cliente', component: EditarClienteComponent },
      { path: 'facturar', component: FacturarComponent },
      { path: 'lista-anticipos', component: ListaAnticiposComponent },
      { path: 'lista-empleados', component: ListaEmpleadosComponent },
      { path: 'lista-clientes', component: ListaClientesComponent },
      { path: 'lista-facturas', component: ListaFacturasComponent },
      { path: 'lista-obras', component: ListaObrasComponent },
      { path: 'lista-productos', component: ListaProductosComponent },
      { path: 'lista-proveedores', component: ListaProveedoresComponent },
      { path: 'registrar-compra', component: RegistrarCompraComponent },
      { path: 'registrar-factura-compra', component: RegistrarFacturaCompraComponent },
      { path: 'registro-general', component: RegistroGeneralComponent },
      { path: 'pagar-rol', component: PagarRolComponent },
    ]
  },
  // Otras rutas si es necesario
  { path: '**', redirectTo: 'inicio' } // Redirige a "inicio" si la ruta no coincide con ninguna
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
