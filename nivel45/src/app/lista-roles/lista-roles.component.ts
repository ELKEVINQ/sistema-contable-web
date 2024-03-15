import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../services/empleado/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-roles',
  templateUrl: './lista-roles.component.html',
  styleUrl: './lista-roles.component.css'
})
export class ListaRolesComponent {
  empleados: any[] = [];
  roles: any[] = [];
  filtroForm!: FormGroup;
  columnaBusqueda: string | null = 'cedula';  // Inicializado en 'cedula' por defecto
  paginaActual = 1;
  itemsPorPagina = 10;

  idEmpleado: any;
  cedula: any;
  nombres: any;
  anticipos: any[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private empleadoService: EmpleadoService, private router: Router) {
    this.filtroForm = this.fb.group({
      tipoBusqueda: ['cedula'],
      valorBusqueda: ['']
    });
  }

  formatearFecha(str: string) {
    if (str.length > 10) {
      return str.substring(0, 10);
    } else {
      return str;
    }
  }

  formatToMySQLDate(date: Date) {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  ngOnInit() {
    this.getParamsAtStart();
    this.obtenerRoles();
  }

  getParamsAtStart() {
    this.route.queryParams.subscribe(params => {
      this.idEmpleado = params['idEmpleado'];
      this.cedula = params['cedula']
      this.nombres = params['nombres'];
    });
  }

  obtenerRoles() {
    this.empleadoService.obtenerRolesEmpleado(this.idEmpleado).subscribe((data: any[]) => {
      this.roles = data;
    });
  }

  imprimirRol(rol: any) {
    this.empleadoService.obtenerAnticiposEmpleadoFechado(this.idEmpleado, rol.fechaInicio, rol.fechaPago).subscribe((data: any[]) => {
      this.anticipos = data;
    });
    let anticiposSumados = 0; // Reinicia el total antes de sumar

    for (let i = 0; i < this.anticipos.length; i++) {
      anticiposSumados += this.anticipos[i].valor;
    }
    const fechaInicio = new Date(rol.fechaInicio);
    const fechaPago = new Date(rol.fechaPago);

    // Calcula la diferencia en milisegundos entre las fechas
    const diffMilliseconds = fechaPago.getTime() - fechaInicio.getTime();

    // Convierte la diferencia en días
    const dias = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));
    console.log("Diferencia en días:", dias);
    this.empleadoService.imprimirRol(this.nombres, rol.valor, this.formatearFecha(rol.fechaInicio), this.formatearFecha(rol.fechaPago), rol.observaciones, this.cedula, dias, anticiposSumados, false, this.anticipos);
  }

  onPageChange(event: number) {
    this.paginaActual = event;
  }

  get paginas() {
    return Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
  }

  get paginasTotales() {
    return Math.ceil(this.roles.length / this.itemsPorPagina);
  }

  get rolesPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.roles.slice(inicio, fin);
  }
}
