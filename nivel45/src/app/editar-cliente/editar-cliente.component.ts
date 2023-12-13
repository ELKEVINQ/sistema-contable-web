import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services/cliente/cliente.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent {

  formCliente: FormGroup;

  cliente: any;

  cedula: string = "";
  nombres: string = "";
  apellidos: string = "";
  telefono: string = "";
  correo: string = "";
  direccion: string = "";

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private clienteService: ClienteService) {
    this.cedula = route.snapshot.queryParams['cedula'];
    this.obtenerCliente(this.cedula);
    this.formCliente = fb.group({
      cedula: [''],
      nombres: [''],
      apellidos: [''],
      telefono: [''],
      correo: [''],
      direccion: [''],
    })
  }

  obtenerCliente(cedula: any) {
    this.clienteService.obtenerCliente(cedula).subscribe((data: any) => {
      this.cliente = data;
      console.log(data);
      this.asignarDatos();
    })
  }

  asignarDatos() {
    this.formCliente.get('nombres')?.setValue(this.cliente[0].nombres);
    this.formCliente.get('apellidos')?.setValue(this.cliente[0].apellidos);
    this.formCliente.get('telefono')?.setValue(this.cliente[0].telefono);
    this.formCliente.get('direccion')?.setValue(this.cliente[0].direccion);
    this.formCliente.get('correo')?.setValue(this.cliente[0].correo);
  }

  onSubmit() {

  }
}
