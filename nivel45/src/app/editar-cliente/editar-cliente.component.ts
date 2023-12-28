import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private clienteService: ClienteService, private router: Router) {
    this.cedula = route.snapshot.queryParams['cedula'];
    this.obtenerCliente(this.cedula);
    this.formCliente = fb.group({
      cedula: [this.cedula],
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

  volver() {
    this.router.navigate(['/p/lista-clientes'], {
    });
  }

  onSubmit() {
    if(this.formCliente.valid){
      const { cedula, nombres, apellidos, telefono, correo, direccion } = this.formCliente.value;

      // Llama al servicio para insertar el cliente
      this.clienteService.editarCliente( {cedula, nombres, apellidos, telefono, correo, direccion} ).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Cliente modificado correctamente');
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al modificar el cliente');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
