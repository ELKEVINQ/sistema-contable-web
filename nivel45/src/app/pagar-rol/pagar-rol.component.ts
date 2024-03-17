import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  idEmpleado: string = '';
  cedula: string | null = null;
  nombres: string | null = null;
  descripcion: string | null = null;
  fecha: Date | null = null;
  observaciones: string | null = null;
  sueldoACancelar: string | null = null;

  dias: number = 0;

  anticipos: any[] = [];
  anticiposSumados: number = 0;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private registroService: RegistroService, private empleadoService: EmpleadoService, private router: Router) {
    this.rolForm = this.fb.group({
      idEmpleado: [''],
      cedula: [''],
      nombres: [''],
      valor: ['', [Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      descripcion: [''],
      fecha: [''],
      observaciones: [''],
      anticiposSumados: ['']
    });

    this.rolForm.get('fecha')?.valueChanges.subscribe(() => {
      this.solicitarValorAnticipo();
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
      this.sueldoACancelar = params['sueldo'];
    });
    this.rolForm.get('idEmpleado')?.setValue(this.idEmpleado);
    this.rolForm.get('cedula')?.setValue(this.cedula);
    this.rolForm.get('nombres')?.setValue(this.nombres);
    this.rolForm.get('valor')?.setValue(this.sueldoACancelar)
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
    this.router.navigate(['/p/registro-general'], {
    });
  }

  formatearFecha(str: string) {
    if (str.length > 10) {
      return str.substring(0, 10);
    } else {
      return str;
    }
  }

  solicitarValorAnticipo() {
    const fecha = this.rolForm.get('fecha')?.value;
    const fechaFormateada = this.formatToMySQLDate(fecha);
    this.anticipos = [];
    this.empleadoService.obtenerAnticiposEmpleado( this.idEmpleado, fechaFormateada ).subscribe((data: any[]) => {
      this.anticipos = data;
    });

    setTimeout(() => {
      const fechaActual = new Date();

      this.anticiposSumados = 0; // Reinicia el total antes de sumar

      for (let i = 0; i < this.anticipos.length; i++){
        this.anticiposSumados += this.anticipos[i].valor;
      }
      const fecha1: Date = new Date(fecha.year, fecha.month - 1, fecha.day);

      this.rolForm.get('anticiposSumados')?.setValue(this.anticiposSumados);
      const dias = fechaActual.getDate() - fecha1.getDate()

      // Asigna el número de días a la variable 'dias'
      this.dias = dias;
    }, 200);
  }



  onSubmit() {
    if (this.rolForm.valid) {
      const { idEmpleado, nombres, valor, fecha, descripcion, observaciones } = this.rolForm.value;
      const anticipo = this.anticiposSumados
      const fechaFormateada = this.formatToMySQLDate(fecha)
      const fechaPago = (this.dateToMySQLDate(new Date()))

      // Llama al servicio para insertar el anticipo
      this.registroService.insertarRol({ idEmpleado, valor: (valor-anticipo) , anticipo, fechaFormateada, descripcion, observaciones, fechaPago }).subscribe((response: { success: any; }) => {
        if (response.success) {
          alert('Rol de pago insertado correctamente');
          this.volver()
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
