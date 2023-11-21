import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObraService } from '../services/obras/obras.service';
import { ClienteService } from '../services/cliente/cliente.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-obra',
  templateUrl: './add-obra.component.html',
  styleUrls: ['./add-obra.component.css']
})
export class AddObraComponent implements OnInit {
  obraForm!: FormGroup;

  constructor(private fb: FormBuilder, private obraService: ObraService , private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obraForm = this.fb.group({
      cedula: ['', Validators.required],
      numero: [''],
      descripcion: ['', Validators.required],
      total: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      fechaInicio: ['', Validators.required],
    });

    // Escuchar cambios en el campo cedula
    this.obraForm.get('cedula')?.valueChanges.subscribe((cedula) => {
      if (cedula.length === 10 || cedula.length === 13) {
        // Realizar solicitud HTTP para obtener la cantidad de obras
        this.obraService.obtenerNumeroObras(cedula).subscribe((response) => {
          // Asignar la cantidad al campo 'numero' (o 0 si no hay obras)
          this.obraForm.get('numero')?.setValue((response.cantidadObras || 0) + 1) ;
        });
      }
    });
  }

  buscarCliente(cedula: string) {
    // Realizar la solicitud al servicio de obras para obtener la lista de clientes
    this.clienteService.obtenerCliente(cedula).subscribe((clientes) => {
      // Filtrar el cliente por la cédula
      const clienteEncontrado = clientes.find(cliente => cliente.cedula === cedula);

      if (clienteEncontrado) {
        // Si se encuentra el cliente, asignar el valor al campo número en el formulario
        this.obraForm.get('numero')?.setValue(clienteEncontrado.numero + 1);
      }
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

  onSubmit() {
    // Verificar si el formulario es válido
    if (this.obraForm.valid) {
      // Obtener los valores del formulario
      const { cedula, numero, descripcion, total, fechaInicio } = this.obraForm.value;

      // Formatear la fecha antes de realizar la solicitud al servicio de obras
      const fechaFormateada = this.formatToMySQLDate(fechaInicio);

      // Realizar la solicitud al servicio de obras para insertar la obra
      this.obraService.insertarObra({ cedula, numero, descripcion, total, fechaInicio: fechaFormateada, estado: "En Proceso" })
        .subscribe((response: any) => {
          if (response.success) {
            alert('Obra insertada correctamente');
            // Puedes redirigir a otra página o realizar otras acciones aquí
          } else {
            alert('Error al insertar la obra');
            // Manejar el error según sea necesario
          }
        });
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error o realizar otras acciones
      alert('El formulario no es válido');
    }
  }
}
