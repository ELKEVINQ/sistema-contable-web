import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-anticipo',
  templateUrl: './add-anticipo.component.html',
  styleUrls: ['./add-anticipo.component.css']
})
export class AddAnticipoComponent implements OnInit {
  anticipoForm: FormGroup;
  idObra: string | null = null;
  cedula: string | null = null;
  nombres: string | null = null;
  apellidos: string | null = null;
  numero: number | null = null;
  descripcion: string | null = null;
  fecha: Date | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.anticipoForm = this.fb.group({
      idObra: [''],
      cedula: [''],
      nombres: [''],
      apellidos: [''],
      valor: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      numero: [''],
      descripcion: [''],
      fecha: [''],
    });
  }

  ngOnInit(): void {
    this.getParamsAtStart();
  }

  getParamsAtStart() {
    this.route.queryParams.subscribe(params => {
      this.idObra = params['idObra'];
      this.cedula = params['cedula'];
      this.nombres = params['nombres'];
      this.apellidos = params['apellidos'];
      this.numero = params['numero'];
    });
    this.anticipoForm.get('idObra')?.setValue(this.idObra);
    this.anticipoForm.get('cedula')?.setValue(this.cedula);
    this.anticipoForm.get('nombres')?.setValue(this.nombres);
    this.anticipoForm.get('apellidos')?.setValue(this.apellidos);
    this.anticipoForm.get('numero')?.setValue(this.numero);
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

  volver() {
    this.router.navigate(['/p/lista-anticipos'], {
    });
  }

  onSubmit() {
    if (this.anticipoForm.valid) {
      const anticipoData = this.anticipoForm.value;

      // Formatear la fecha antes de enviarla al servidor
      anticipoData.fecha = this.formatToMySQLDate(anticipoData.fecha);

      // Llama al servicio para insertar el anticipo
      this.registroService.insertarAnticipo(anticipoData).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Anticipo insertado correctamente');
          this.volver()
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al insertar el anticipo');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
