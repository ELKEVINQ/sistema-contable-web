import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../services/registro/registro.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registrar-compra',
  templateUrl: './registrar-compra.component.html',
  styleUrls: ['./registrar-compra.component.css']
})
export class RegistrarCompraComponent {
  compraForm: FormGroup;
  descripcion: string | null = null;
  fecha: Date | null = null;
  valor: number | null = null;

  constructor(private fb: FormBuilder, private registroService: RegistroService) {
    this.compraForm = this.fb.group({
      descripcion: [''],
      valor: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      fecha: [''],
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
      const compraData = this.compraForm.value;

      // Formatear la fecha antes de enviarla al servidor
      compraData.fecha = this.formatToMySQLDate(compraData.fecha);

      // Llama al servicio para insertar el anticipo
      this.registroService.insertarGasto(compraData).subscribe((response: { success: any; }) => {
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