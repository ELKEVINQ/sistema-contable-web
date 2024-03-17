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
  sueldo: number = 0;

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
      this.sueldo = params['sueldo']
    });
  }

  obtenerRoles() {
    this.empleadoService.obtenerRolesEmpleado(this.idEmpleado).subscribe((data: any[]) => {
      this.roles = data;
    });
  }

  imprimirRol(rol: any) {
    let anticipos: any[] = [];
    let anticiposSumados = 0;
    this.empleadoService.obtenerAnticiposEmpleadoFechado(this.idEmpleado, rol.fechaInicio, rol.fechaPago).subscribe((data: any[]) => {
      anticipos = data;
      for (let i = 0; i < anticipos.length; i++) {
        anticiposSumados += anticipos[i].valor;
      }
      console.log(anticiposSumados)
      const fechaInicio = new Date(rol.fechaInicio);
      const fechaPago = new Date(rol.fechaPago);

      // Calcula la diferencia en milisegundos entre las fechas
      const diffMilliseconds = fechaPago.getTime() - fechaInicio.getTime();

      // Convierte la diferencia en días
      const dias = Math.floor(diffMilliseconds / (24 * 60 * 60 * 1000));
      this.empleadoService.imprimirRol(this.nombres, this.sueldo, this.formatearFecha(rol.fechaInicio), this.formatearFecha(rol.fechaPago), rol.observaciones, this.cedula, dias, anticiposSumados, false, anticipos);
    }); // Reinicia el total antes de sumar
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

  regular(valor: number): string {
    if (valor === null || valor == 0) {
      return "0.00"
    } else {
      if (valor % 2 !== 0) {
        return valor.toFixed(2) + "";
      }
      return valor + ".00";
    }
  }
}
