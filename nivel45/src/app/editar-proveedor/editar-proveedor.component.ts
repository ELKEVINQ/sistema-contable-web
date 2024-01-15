import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../services/proveedor/proveedor.service';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.css'
})
export class EditarProveedorComponent {
  formProveedor: FormGroup;

  proveedor: any;

  idProveedor: string = "";
  nombre: string = "";
  celular: string = "";
  telefono: string = "";
  direccion: string = "";

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private proveedorService: ProveedorService, private router: Router) {
    this.idProveedor = route.snapshot.queryParams['idProveedor'];
    this.obtenerProveedor(this.idProveedor);
    this.formProveedor = fb.group({
      idProveedor: [this.idProveedor],
      nombre: [''],
      celular: [''],
      telefono: [''],
      direccion: [''],
    })
  }

  obtenerProveedor(idProveedor: any) {
    this.proveedorService.obtenerProveedorPorId(idProveedor).subscribe((data: any) => {
      this.proveedor = data;
      console.log(data);
      this.asignarDatos();
    })
  }

  asignarDatos() {
    this.formProveedor.get('nombre')?.setValue(this.proveedor[0].nombre);
    this.formProveedor.get('celular')?.setValue(this.proveedor[0].celular);
    this.formProveedor.get('telefono')?.setValue(this.proveedor[0].telefono);
    this.formProveedor.get('direccion')?.setValue(this.proveedor[0].direccion);
  }

  volver() {
    this.router.navigate(['/p/lista-proveedores'], {
    });
  }

  onSubmit() {
    if(this.formProveedor.valid){
      const { idProveedor, nombre, celular, telefono, direccion } = this.formProveedor.value;

      // Llama al servicio para insertar el cliente
      this.proveedorService.editarProveedor( {idProveedor, nombre, celular, telefono, direccion} ).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Proveedor modificado correctamente');
          this.volver();
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al modificar el proveedor');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}

