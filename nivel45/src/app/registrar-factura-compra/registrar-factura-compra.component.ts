import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturaCompraService } from '../services/factura-compra/factura-compra.service';
import { ProveedorService } from '../services/proveedor/proveedor.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ObraService } from '../services/obras/obras.service';

@Component({
  selector: 'app-registrar-factura-compra',
  templateUrl: './registrar-factura-compra.component.html',
  styleUrls: ['./registrar-factura-compra.component.css']
})
export class RegistrarFacturaCompraComponent {
  facturaCompraForm: FormGroup;
  obraForm: FormGroup;
  idFacturaCompra: string | null = null;
  idProveedor: string | null = null;
  nombre: string | null = null;
  descripcion: string | null = null;
  fecha: Date | null = null;
  valor: number | null = null;
  perteneceObra: boolean | null = null;

  tieneObra: boolean = false;

  idObra: string = '';
  obras: any[] = [];

  constructor(private fb: FormBuilder, private facturaCompraService: FacturaCompraService, private proveedorService: ProveedorService, private obraService: ObraService) {
    this.facturaCompraForm = this.fb.group({
      idFacturaCompra: [''],
      idProveedor: [''],
      nombre: [''],
      descripcion: [''],
      valor: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      fecha: [''],
      perteneceObra: [''],
    });
    this.obraForm = this.fb.group({
      cedula: [''],
    });
  }

  ngOnInit(): void {
    this.nombre = '';
  }

  validarEntrada(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Solo permitir números y puntos
    const pattern = /^[0-9.]+$/;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  abrirListaObras() {
    this.obraService.obtenerObrasCedula(this.obraForm.get('cedula')?.value).subscribe((data: any[]) => {
      // Filtrar las obras con estado "En Proceso"
      const obrasEnProceso = data.filter(obra => obra.estado === 'En Proceso');

      // Agregar las obras filtradas al array 'obras'
      this.obras.push(...obrasEnProceso);
    });
  }

  seleccionarObra(obra: any) {
    // Aquí puedes realizar cualquier acción que desees con la obra seleccionada
    this.idObra = obra.idObra;
    console.log("obra: " + this.idObra)
    this.toogleObra();
    // Puedes, por ejemplo, abrir un modal, navegar a otra página, etc.
  }

  toogleObra() {
    this.tieneObra = !this.tieneObra;
    this.facturaCompraForm.get('perteneceObra')?.setValue(this.tieneObra);
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

  onInputChange() {
    const nombre = this.facturaCompraForm.get('nombre')?.value;

    if (nombre) {
      this.proveedorService.obtenerProveedorPorNombre(nombre).subscribe((proveedores) => {

        // Verificar si hay algún proveedor con el nombre dado
        const proveedorEncontrado = proveedores.find(proveedor => proveedor.nombre === nombre);

        if (proveedorEncontrado) {
          alert("Proveedor encontrado: " + nombre);
          this.facturaCompraForm.get('idProveedor')?.setValue(proveedorEncontrado.idProveedor);
        }
      });
    }
  }

  onSubmit() {
    if (this.facturaCompraForm.valid) {
      const { idFacturaCompra, idProveedor, nombre, descripcion, valor, fecha } = this.facturaCompraForm.value;

      // Formatear la fecha antes de enviarla al servidor
      const fechaFormateada = this.formatToMySQLDate(fecha);
      const idObra = this.idObra

      // Llama al servicio para insertar el anticipo
      this.facturaCompraService.insertarFacturaCompra({ idFacturaCompra, idProveedor, descripcion, fecha: fechaFormateada, valor, idObra }).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Factura de compra insertada correctamente');
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al insertar la factura de compra');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
