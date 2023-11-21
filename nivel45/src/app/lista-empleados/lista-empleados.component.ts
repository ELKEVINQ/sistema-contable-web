import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../services/empleado/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {
  empleados: any[] = [];
  empleadosFiltrados: any[] = [];
  filtroForm!: FormGroup;
  columnaBusqueda: string | null = 'cedula';  // Inicializado en 'cedula' por defecto
  paginaActual = 1;
  itemsPorPagina = 10;

  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService, private router: Router) {
    this.filtroForm = this.fb.group({
    tipoBusqueda: ['cedula'],
    valorBusqueda: ['']
  });
  }

  irAPagar(empleado: any) {
    this.router.navigate(['/p/pagar-rol'], { queryParams: { idEmpleado: empleado.idEmpleado, cedula: empleado.cedula, nombres: empleado.nombres } });
  }

  guardarEstado(empleado: any){

  }

  ngOnInit() {
    this.obtenerObras();
  }

  obtenerObras() {
    this.empleadoService.obtenerEmpleados().subscribe((data: any[]) => {
      this.empleados = data;
      this.aplicarFiltros();
    });
  }

  actualizarEstado(empleado: any) {
    console.log(`Nuevo estado para el empleado ${empleado.idEmpleado}: ${empleado.estado}`);
  }

  seleccionarColumna() {
    this.aplicarFiltros();
  }

  onInputChange() {
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    const tipoBusqueda = this.filtroForm.get('tipoBusqueda')?.value;
    const valorBusqueda = this.filtroForm.get('valorBusqueda')?.value;
  
    if (tipoBusqueda !== null && valorBusqueda !== null) {
      // Convertir ambos valores a minúsculas
      const valorBusquedaLower = valorBusqueda.toLowerCase();
  
      // Filtra los empleados
      this.empleadosFiltrados = this.empleados.filter(empleados =>
        empleados[tipoBusqueda].toLowerCase().includes(valorBusquedaLower)
      );
  
      // Reinicia la paginación
      this.paginaActual = 1;
    }
  }  

  onPageChange(event: number) {
    this.paginaActual = event;
  }

  get paginas() {
    return Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
  }

  get paginasTotales() {
    return Math.ceil(this.empleadosFiltrados.length / this.itemsPorPagina);
  }

  get empleadosPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.empleadosFiltrados.slice(inicio, fin);
  }
}
