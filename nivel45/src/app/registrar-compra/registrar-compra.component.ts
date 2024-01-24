import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../services/registro/registro.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ObraService } from '../services/obras/obras.service';
import { EmpleadoService } from '../services/empleado/empleado.service';

@Component({
  selector: 'app-registrar-compra',
  templateUrl: './registrar-compra.component.html',
  styleUrls: ['./registrar-compra.component.css']
})
export class RegistrarCompraComponent {
  compraForm: FormGroup;
  obraForm: FormGroup;
  descripcion: string | null = null;
  fecha: Date | null = null;
  valor: number | null = null;
  perteneceObra: boolean = false;
  perteneceEmpleado: boolean = false;
  esAnticipo: boolean = false;

  tieneObra: boolean = false;

  idObra: string = '';
  obras: any[] = [];

  idEmpleado: string = '';
  empleados: any[] = [];

  constructor(private fb: FormBuilder, private registroService: RegistroService, private obraService: ObraService, private empleadoService: EmpleadoService) {
    this.compraForm = this.fb.group({
      descripcion: [''],
      valor: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      fecha: [''],
    });
    this.obraForm = this.fb.group({
      cedula: [''],
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

  abrirListaObras() {
    this.obraService.obtenerObrasCedula(this.obraForm.get('cedula')?.value).subscribe((data: any[]) => {
      // Filtrar las obras con estado "En Proceso"
      const obrasEnProceso = data.filter(obra => obra.estado === 'En Proceso');

      // Agregar las obras filtradas al array 'obras'
      this.obras.push(...obrasEnProceso);
    });
  }

  abrirListaEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe((data: any[]) => {
      // Filtrar las obras con estado "En Proceso"
      const empleados = data.filter(empleado => empleado.estado === 'Activo');

      // Agregar las obras filtradas al array 'obras'
      this.empleados.push(...empleados);
    });
  }

  seleccionarEmpleado(empleado: any) {
    // Aquí puedes realizar cualquier acción que desees con la obra seleccionada
    this.idEmpleado = empleado.idEmpleado;
    this.toogleEmpleados();
    // Puedes, por ejemplo, abrir un modal, navegar a otra página, etc.
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
    this.compraForm.get('perteneceObra')?.setValue(this.tieneObra);
  }

  toogleEmpleados() {
    this.esAnticipo = !this.esAnticipo;
    this.compraForm.get('perteneceEmpleado')?.setValue(this.esAnticipo);
    this.abrirListaEmpleados()
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

  onSubmit() {
    if (this.compraForm.valid) {
      const {descripcion, valor, fecha} = this.compraForm.value;

      // Formatear la fecha antes de enviarla al servidor
      const fechaFormat = this.formatToMySQLDate(fecha);

      // Llama al servicio para insertar el anticipo
      this.registroService.insertarGasto({descripcion, valor, fecha: fechaFormat, idObra: this.idObra, idEmpleado: this.idEmpleado}).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Compra insertada correctamente');
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al insertar la compra');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
