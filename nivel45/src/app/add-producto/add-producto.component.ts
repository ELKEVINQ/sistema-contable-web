import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto/producto.service';
import { ProveedorService } from '../services/proveedor/proveedor.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})
export class AddProductoComponent {
  productoForm: FormGroup;
  idProveedor: string | null = null;
  nombre: string | null = null;
  nombreProveedor: string | null = null;
  descripcion: string | null = null;
  precio: number | null = null;
  precioIva: number | null = null;
  existencias: number | null = null;

  constructor(private fb: FormBuilder, private productoService: ProductoService, private proveedorService: ProveedorService, private router: Router) {
    this.productoForm = this.fb.group({
      idProveedor: [''],
      nombre: [''],
      nombreProveedor: [''],
      precio: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      precioIva: [''],
      existencias: [''],
    });
  }

  ngOnInit(): void {
    // Agrega un "listener" para cambios en el campo precio
    this.productoForm.get('precio')?.valueChanges.subscribe((nuevoValor) => {
      // Multiplica por 1.12 y redondea a 3 decimales
      const precioIva = parseFloat((nuevoValor * 1.12).toFixed(3));

      // Actualiza el valor del campo precioIva
      this.productoForm.patchValue({
        precioIva: precioIva
      });
    });
  }

  validarEntrada(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Solo permitir números y puntos
    const pattern = /^[0-9.]+$/;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onInputChange() {
    const nombre = this.productoForm.get('nombreProveedor')?.value;

    if (nombre) {
      this.proveedorService.obtenerProveedorPorNombre(nombre).subscribe((proveedores) => {

        // Verificar si hay algún proveedor con el nombre dado
        const proveedorEncontrado = proveedores.find(proveedor => proveedor.nombre === nombre);

        if (proveedorEncontrado) {
          alert("Proveedor encontrado: " + nombre);
          this.productoForm.get('idProveedor')?.setValue(proveedorEncontrado.idProveedor);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/p/lista-clientes'], {
    });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const productoData = this.productoForm.value;

      // Formatear la fecha antes de enviarla al servidor

      // Llama al servicio para insertar el anticipo
      this.productoService.insertarProducto(productoData).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Producto insertado correctamente');
          this.volver();
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al insertar el producto');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
