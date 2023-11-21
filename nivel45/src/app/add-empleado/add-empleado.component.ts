import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../services/empleado/empleado.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../services/cliente/cliente.service';

@Component({
  selector: 'app-add-empleado',
  templateUrl: './add-empleado.component.html',
  styleUrls: ['./add-empleado.component.css']
})
export class AddEmpleadoComponent {
  empleadoForm!: FormGroup;
  cedula: string = '';
  nombres: string = '';

  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      cedula: [''],
      nombres: ['', Validators.required],
      fecha_entrada: [''],
      sueldo: [''],
    });
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
    if(this.empleadoForm.get('cedula')?.value.length === 10){
      this.cedula = this.empleadoForm.get('cedula')?.value;
      this.clienteService.obtenerCliente(this.cedula).subscribe((clientes) => {
        // Filtrar el cliente por la cédula
        const clienteEncontrado = clientes.find(cliente => cliente.cedula === this.cedula);

        if (clienteEncontrado) {
          // Si se encuentra el cliente, asignar el valor al campo número en el formulario
          this.empleadoForm.get('nombres')?.setValue(clienteEncontrado.nombres + " " + clienteEncontrado.apellidos);
        }
      });
    }else {
      this.empleadoForm.get('nombres')?.setValue('');
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
    if (this.empleadoForm.valid) {
      // Obtener el valor del campo de nombre
      const nombreControl = this.empleadoForm.get('nombre');

      // Verificar si el campo de nombre está presente y no es undefined
      if (nombreControl && nombreControl.hasError('required')) {
        alert('El campo de nombre no puede estar vacío. El empleado no es válido.');
        return; // No hacer la inserción si el nombre está vacío
      }

      // Obtener los valores del formulario
      const { cedula, fecha_entrada, sueldo, estado } = this.empleadoForm.value;

      const fechaFormateada = this.formatToMySQLDate(fecha_entrada);

      // Realizar la solicitud al servicio de empleados para insertar el empleado
      this.empleadoService.insertarEmpleado({ cedula, fecha_entrada: fechaFormateada, sueldo, estado: "Activo" }).subscribe((response: any) => {
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
