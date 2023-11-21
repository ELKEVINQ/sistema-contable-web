import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';
import { EmpleadoService } from '../services/empleado/empleado.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagar-rol',
  templateUrl: './pagar-rol.component.html',
  styleUrls: ['./pagar-rol.component.css']
})
export class PagarRolComponent {
  rolForm: FormGroup;
  idEmpleado: string | null = null;
  cedula: string | null = null;
  nombres: string | null = null;
  descripcion: string | null = null;
  fecha: Date | null = null;
  observaciones: string | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private registroService: RegistroService, private empleadoService: EmpleadoService) {
    this.rolForm = this.fb.group({
      idEmpleado: [''],
      cedula: [''],
      nombres: [''],
      valor: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      descripcion: [''],
      fecha: [''],
      observaciones: [''],
    });
  }

  ngOnInit(): void {
    this.getParamsAtStart();
  }

  getParamsAtStart() {
    this.route.queryParams.subscribe(params => {
      this.idEmpleado = params['idEmpleado'];
      this.cedula = params['cedula'];
      this.nombres = params['nombres'];
    });
    this.rolForm.get('idEmpleado')?.setValue(this.idEmpleado);
    this.rolForm.get('cedula')?.setValue(this.cedula);
    this.rolForm.get('nombres')?.setValue(this.nombres);
  }

  validarEntrada(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Solo permitir números y puntos
    const pattern = /^[0-9.]+$/;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
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
    if (this.rolForm.valid) {
      const rolData = this.rolForm.value;

      // Formatear la fecha antes de enviarla al servidor
      rolData.fecha = this.formatToMySQLDate(rolData.fecha);

      // Llama al servicio para insertar el anticipo
      this.registroService.insertarRol(rolData).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Rol de pago insertado correctamente');
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al insertar el rol de pago');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
