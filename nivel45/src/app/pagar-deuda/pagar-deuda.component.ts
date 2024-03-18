import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagar-deuda',
  templateUrl: './pagar-deuda.component.html',
  styleUrl: './pagar-deuda.component.css'
})
export class PagarDeudaComponent {
  deudaForm: FormGroup;
  idDeuda: string = '';
  descripcion: string | null = null;
  propietario: string | null = null;
  valor: number = 0;
  valorAPagar: number = 0;
  sumaPagos: number = 0
  fecha: any | null = null

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.deudaForm = this.fb.group({
      idDeuda: [''],
      descripcion: [''],
      propietario: [''],
      valor: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      valorTotal: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      fecha: [''],
      sumaPagos: [''],
    });
  }

  ngOnInit(): void {
    this.getParamsAtStart();

    this.registroService.obtenerMovimientos(this.idDeuda).subscribe((data: any[]) => {
      if(data!=null){
        for(let i = 0; i < data.length; i++){
          this.sumaPagos += data[i].valor
        }
      }else{
        this.sumaPagos = 0
      }
    })
  }

  getParamsAtStart() {
    this.route.queryParams.subscribe(params => {
      this.idDeuda = params['idDeuda'];
      this.descripcion = params['descripcion'];
      this.propietario = params['propietario'];
      this.valorAPagar = params['valor'];
    });
    this.deudaForm.get('idDeuda')?.setValue(this.idDeuda);
    this.deudaForm.get('descripcion')?.setValue(this.descripcion);
    this.deudaForm.get('propietario')?.setValue(this.propietario);
    this.deudaForm.get('valor')?.setValue(this.valor)
    this.deudaForm.get('valorTotal')?.setValue(this.valorAPagar)
    this.deudaForm.get('sumaPagos')?.setValue(this.sumaPagos)
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

  dateToMySQLDate(date: Date) {
    // Obtén los componentes de la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');

    // Construye la cadena de fecha en formato MySQL
    const mysqlDate = `${year}-${month}-${day}`;

    return mysqlDate;
  }

  volver() {
    this.router.navigate(['/p/lista-deuda'], {
    });
  }

  formatearFecha(str: string) {
    if (str.length > 10) {
      return str.substring(0, 10);
    } else {
      return str;
    }
  }

  onSubmit() {
    if (this.deudaForm.valid) {
      const fechaPago = this.formatToMySQLDate(this.deudaForm.get('fecha')?.value)
      const valor = this.deudaForm.get('valor')?.value
      let estado = "Deuda"
      if (valor < this.valorAPagar){
        estado = "Deuda"
      }else{
        estado = "Pagado"
      }

      const deudaData = {
        fechaPago: fechaPago,
        valor: valor,
        idDeuda: this.idDeuda,
        estado: estado
      }
      console.log(deudaData)
      // Llama al servicio para insertar el anticipo
      this.registroService.pagarDeuda(deudaData).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Deuda pagada correctamente');
          this.volver()
          // Puedes hacer más cosas aquí, como redirigir a otra página
        } else {
          alert('Error al insertar el pago');
          // Manejo de errores
        }
      });
    } else {
      alert('Formulario inválido. Revise los campos.');
    }
  }
}
