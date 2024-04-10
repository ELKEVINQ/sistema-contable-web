import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aumentar-deuda',
  templateUrl: './aumentar-deuda.component.html',
  styleUrl: './aumentar-deuda.component.css'
})
export class AumentarDeudaComponent {
  deudaForm: FormGroup;
  idDeuda: string = "";
  propietario: string = "";
  valorDeuda: any | null = null;
  saldoDeuda: any | null = null;
  valorAumento: number = 0;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.deudaForm = this.fb.group({
      propietario: [''],
      valorDeuda: [''],
      saldoDeuda: [''],
      valorAumento: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      fechaInicio: [''],
      prestamo: [''],
    });
  }

  ngOnInit(): void {
    this.getParamsAtStart()
  }

  getParamsAtStart() {
    this.route.queryParams.subscribe(params => {
      this.idDeuda = params['idDeuda'];
      this.propietario = params['propietario'];
      this.valorDeuda = params['valor'];
      this.saldoDeuda = params['saldo']
    });
    this.deudaForm.get('idDeuda')?.setValue(this.idDeuda);
    this.deudaForm.get('propietario')?.setValue(this.propietario);
    this.deudaForm.get('valorDeuda')?.setValue(this.valorDeuda)
    this.deudaForm.get('saldoActual')?.setValue(this.saldoDeuda)
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
    this.router.navigate(['/p/lista-deuda'], {
    });
  }

  onSubmit() {
    if (this.deudaForm.valid) {
      const deudaData = {
        idDeuda: this.idDeuda,
        valor: this.deudaForm.get('valorDeuda')?.value + this.deudaForm.get('valorAumento')?.value,
        prestamo: this.deudaForm.get('valorAumento')?.value,
        fechaInicio: this.deudaForm.get('fechaInicio')?.value,
      };

      // Formatear la fecha antes de enviarla al servidor
      deudaData.fechaInicio = this.formatToMySQLDate(deudaData.fechaInicio);

      // Llama al servicio para insertar el anticipo
      this.registroService.aumentarDeuda(deudaData).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('deuda aumentada correctamente');
          this.volver()
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al aumentar la deuda');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
