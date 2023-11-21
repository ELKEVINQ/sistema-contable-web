import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProveedorService } from '../services/proveedor/proveedor.service';

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.css']
})
export class AddProveedorComponent {
  proveedorForm!: FormGroup;

  constructor(private fb: FormBuilder, private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.proveedorForm = this.fb.group({
      nombre: [''],
      telefono: [''],
      celular: [''],
      direccion: [''],
    });
  }

  onSubmit() {
    // Verificar si el formulario es válido
    if (this.proveedorForm.valid) {
      // Obtener los valores del formulario
      const proveedorData = this.proveedorForm.value;
      // Realizar la solicitud al servicio de obras para insertar la obra
      this.proveedorService.insertarProveedor(proveedorData).subscribe((response: any) => {
          if (response.success) {
            alert('Proveedor insertado correctamente');
          } else {
            alert('Error al insertar el proveedor');
          }
        });
    } else {
      alert('El formulario no es válido');
    }
  }
}
