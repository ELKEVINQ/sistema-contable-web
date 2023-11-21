import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturaService } from '../services/factura/factura.service';
import { ClienteService } from '../services/cliente/cliente.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../services/producto/producto.service';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { ProductoTabla } from '../interfaces/ProductoTabla';

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.css']
})

export class FacturarComponent {
  facturaForm!: FormGroup;
  cuerpoFacturaForm!: FormGroup;
  addProductoFormModal!: FormGroup;
  productos: any[] = [];
  productosTabla: ProductoTabla[] = [];
  cedula: string = '';
  nombres: string = '';

  mostrarDropdown = false;
  //modal
  nombreModal: string = '';
  cantidadModal: string = '';
  proveedorModal: string = '';
  precioUnitarioModal: string = '';
  precioFinalModal: string = '';
  //fin Modal

  mostrarCamara: boolean = false;
  capturaTrigger: Subject<void> = new Subject<void>();
  facturacionModalSwitch: boolean = false;

  constructor(private fb: FormBuilder, private facturaService: FacturaService, private clienteService: ClienteService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((data: any[]) => {
      this.productos = data;
    });
    this.facturaForm = this.fb.group({
      cedula: [''],
      nombres: ['', Validators.required],
      fecha: [''],
      subtotal: [''],
      iva: [''],
      descuento: [''],
      total: [''],
    });
    this.cuerpoFacturaForm = this.fb.group({
      precioS: [''],
      cantidadS: [''],
      cantidad: [''],
      descripcion: [''],
      precioU: [''],
      precioT: [''],
    });

    this.addProductoFormModal = this.fb.group({
      nombreModal: ['', Validators.required],
      cantidadModal: ['', Validators.required],
      proveedorModal: [''],
      precioUnitarioModal: ['', Validators.required],
      precioFinalModal: [''],
    });

    this.cuerpoFacturaForm.get('precioU')?.valueChanges.subscribe((nuevoValorPrecioU) => {
      this.actualizarPrecioT();
    });

    this.cuerpoFacturaForm.get('cantidad')?.valueChanges.subscribe((nuevoValorCantidad) => {
      this.actualizarPrecioT();
    });

  }

  actualizarPrecioT() {
    const cantidad = parseFloat(this.cuerpoFacturaForm.get('cantidad')?.value);
    const precioU = parseFloat(this.cuerpoFacturaForm.get('precioU')?.value);

    if (cantidad !== null && precioU !== null && !isNaN(cantidad) && !isNaN(precioU)) {
      const precioT = parseFloat((cantidad * precioU).toFixed(2));

      this.cuerpoFacturaForm.patchValue({
        precioT: precioT
      });
    } else {
      this.cuerpoFacturaForm.get('precioT')?.setValue('');
    }
  }

  abrirModal(): void {
    this.facturacionModalSwitch = true;
  }

  cerrarModal(): void {
    this.facturacionModalSwitch = false;
    // También puedes limpiar los campos del formulario aquí
    this.addProductoFormModal.reset();
  }

  addItem() {
    // Obtén los valores del formulario del modal
    const nombre = this.addProductoFormModal.get('nombreModal')?.value;
    const cantidad = this.addProductoFormModal.get('cantidadModal')?.value;
    const proveedor = this.addProductoFormModal.get('proveedorModal')?.value;
    const precioUnitario = this.addProductoFormModal.get('precioUnitarioModal')?.value;
    const precioFinal = this.addProductoFormModal.get('precioFinalModal')?.value;
  
    // Crea un objeto ProductoModal
    const nuevoProducto: ProductoTabla = {
      cantidad: cantidad,
      nombre: nombre,
      precioUnitario: precioUnitario,
      precioTotal: precioFinal,
    };
  
    // Agrega el nuevo producto a la lista
    this.productosTabla.push(nuevoProducto);
  
    // Limpia el formulario del modal o realiza otras acciones necesarias
    this.addProductoFormModal.reset();
  
    // Cierra el modal
    this.cerrarModal();
  }

  abrirCamara() {
    this.mostrarCamara = true;
    this.capturaTrigger.next(); // Inicia la captura de la cámara
  }

  capturarImagen(imagen: WebcamImage) {
    // Lógica para manejar la imagen capturada
    console.log('Imagen capturada:', imagen);
    // Puedes guardar la imagen en una propiedad o procesarla según tus necesidades
  }

  formatToMySQLDate(date: NgbDateStruct): string {
    if (date) {
      const year = date.year;
      const month = date.month.toString().padStart(2, '0');
      const day = date.day.toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  filtrarProductos(nombre: string) {
    return this.productos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }

  inputFocus() {
    this.mostrarDropdown = true;
  }
  
  inputBlur() {
    // Espera un breve momento antes de ocultar el dropdown, para permitir hacer clic en él
    setTimeout(() => {
      this.mostrarDropdown = false;
    }, 200);
  }

  seleccionarProducto(producto: any) {
    this.addProductoFormModal.patchValue({
      proveedorModal: producto.proveedor,
      precioUnitarioModal: producto.precio
    });
  
    // Puedes asignar el valor al campo nombreModal si también deseas
    this.addProductoFormModal.get('nombreModal')?.setValue(producto.nombre);
  
    // Oculta el dropdown después de seleccionar un producto
    this.mostrarDropdown = false;
  }

  mostrar: boolean = false;

  mostrarCamposAdicionales() {
    this.mostrar = !this.mostrar;
  }

  agregarItemEspecial() {
    // Obtén los valores del formulario
    const cantidad = this.cuerpoFacturaForm.get('cantidad')?.value;
    const descripcion = this.cuerpoFacturaForm.get('descripcion')?.value;
    const precioU = this.cuerpoFacturaForm.get('precioU')?.value;
    const precioT = this.cuerpoFacturaForm.get('precioT')?.value;
  
    // Crea un objeto ProductoTabla
    const nuevoProducto: ProductoTabla = {
      cantidad: cantidad,
      nombre: descripcion,
      precioUnitario: precioU,
      precioTotal: precioT,
    };
  
    // Agrega el nuevo producto a la lista
    this.productosTabla.push(nuevoProducto);
  
    // Limpia el formulario o realiza otras acciones necesarias
    this.cuerpoFacturaForm.reset();
  }

  onInputChange() {
    if (this.facturaForm.get('cedula')?.value.length === 10) {
      this.cedula = this.facturaForm.get('cedula')?.value;
      this.clienteService.obtenerCliente(this.cedula).subscribe((clientes) => {
        // Filtrar el cliente por la cédula
        const clienteEncontrado = clientes.find(cliente => cliente.cedula === this.cedula);

        if (clienteEncontrado) {
          // Si se encuentra el cliente, asignar el valor al campo número en el formulario
          this.facturaForm.get('nombres')?.setValue(clienteEncontrado.nombres + " " + clienteEncontrado.apellidos);
        }
      });
    } else {
      this.facturaForm.get('nombres')?.setValue('');
    }
  }

  validarEntrada(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Solo permitir números y puntos
    const pattern = /^[0-9.]+$/;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    // Verificar si el formulario es válido
    if (this.facturaForm.valid) {
      // Obtener el valor del campo de nombre
      const nombreControl = this.facturaForm.get('nombre');

      // Verificar si el campo de nombre está presente y no es undefined
      if (nombreControl && nombreControl.hasError('required')) {
        alert('El campo de nombre no puede estar vacío. El empleado no es válido.');
        return; // No hacer la inserción si el nombre está vacío
      }

      // Obtener los valores del formulario
      const { cedula, fecha_entrada, sueldo, estado } = this.facturaForm.value;

      const fechaFormateada = this.formatToMySQLDate(fecha_entrada);

      // Realizar la solicitud al servicio de empleados para insertar el empleado
      this.facturaService.insertarFactura({ cedula, fecha_entrada: fechaFormateada, sueldo, estado: "Activo" }).subscribe((response: any) => {
        if (response.success) {
          alert('Empleado insertado correctamente');
        } else {
          alert('Error al insertar el empleado');
        }
      });
    } else {
      alert('Alguno de los campos esta vacio');
    }
  }
}