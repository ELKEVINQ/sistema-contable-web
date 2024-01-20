import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../services/empleado/empleado.service';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  estadoTemporal: string = "";

  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService, private router: Router) {
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

  irAPagar(empleado: any) {
    this.router.navigate(['/p/pagar-rol'], { queryParams: {
      idEmpleado: empleado.idEmpleado,
      cedula: empleado.cedula,
      nombres: empleado.nombres,
      sueldo: empleado.sueldo
     } });
  }

  irAMovimientos(empleado: any){
    this.router.navigate(['/p/movimientos-empleado'], { queryParams: {
      idEmpleado: empleado.idEmpleado,
     } });
  }

  actualizarEstado(empleado: any) {
    const cedula = empleado.cedula;
    const estado = this.estadoTemporal;

    const fecha_salida = this.formatToMySQLDate(new Date());

    if(this.estadoTemporal === ""){
      alert("No se modifico el estado previamente")
      return;
    }else{
      console.log("cedula :"+cedula)
      console.log("estado :"+estado)
    }

    if(estado === "Inactivo"){
      this.empleadoService.modificarEstadoEmpleado( { cedula, estado, fecha_salida } ).subscribe((response: { success: any; }) => {
        if (response.success){
          alert('Estado modificado correctamente')
        }else{
          alert('Fallo al modificar el estado')
        }
        this.estadoTemporal = "";
      });
    }else{
      //esto hace que si reactivamos el empleado, tome la fecha actual como fecha de entrada y la de salida se quede en 0
      this.empleadoService.reincorporarEmpleado( { cedula, estado, fecha_salida: "0000-00-00", fecha_entrada: fecha_salida } ).subscribe((response: { success: any; }) => {
        if (response.success){
          alert('Estado modificado correctamente')
          this.reloadPage();
        }else{
          alert('Fallo al modificar el estado')
        }
        this.estadoTemporal = "";
      });
    }
  }

  reloadPage() {
    // Realiza la recarga de la página sin cerrar la sesión
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  modificarSueldo(empleado: any){
    const sueldo = prompt('Ingresa el nuevo sueldo:');
    const cedula = empleado.cedula

    if (sueldo !== null) {
      const regex = /^\d+(\.\d+)?$/;
      if (regex.test(sueldo)) {
        this.empleadoService.modificarSueldoEmpleado( { cedula, sueldo } ).subscribe((response: { success: any; }) => {
          if (response.success){
            alert('Sueldo modificado correctamente')
          }else{
            alert('Fallo al modificar el estado')
          }
        });
      }else{
        alert("No ingresaste un valor valido");
      }
    }else{
      alert("No ingresaste ningun valor")
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
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe((data: any[]) => {
      this.empleados = data;
      this.aplicarFiltros();
    });
  }

  seleccionarColumna() {
    this.aplicarFiltros();
  }

  onEstadoChange(event: any) {
    this.estadoTemporal = event.target.value;
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
