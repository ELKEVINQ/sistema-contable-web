import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-deuda',
  templateUrl: './add-deuda.component.html',
  styleUrl: './add-deuda.component.css'
})
export class AddDeudaComponent {
  deudaForm: FormGroup;
  prestamo: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.deudaForm = this.fb.group({
      descripcion: [''],
      propietario: [''],
      valor: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      fechaInicio: [''],
      prestamo: [''],
    });
  }

  ngOnInit(): void {
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

  formatearFecha(str: string) {
    if (str.length > 10) {
      return str.substring(0, 10);
    } else {
      return str;
    }
  }

  volver() {
    this.router.navigate(['/p/lista-deuda'], {
    });
  }
  esPrestamo(){
      this.prestamo = !this.prestamo;
      this.deudaForm.get('prestamo')?.setValue(this.prestamo);
  }

  onSubmit() {
    if (this.deudaForm.valid) {
      const deudaData = this.deudaForm.value;

      // Formatear la fecha antes de enviarla al servidor
      deudaData.fechaInicio = this.formatToMySQLDate(deudaData.fechaInicio);

      // Llama al servicio para insertar el anticipo
      this.registroService.insertarDeuda(deudaData).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('deuda insertada correctamente');
          this.volver()
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al insertar la deuda');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
