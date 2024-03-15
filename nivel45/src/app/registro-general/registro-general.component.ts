import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegistroService } from '../services/registro/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-general',
  templateUrl: './registro-general.component.html',
  styleUrls: ['./registro-general.component.css']
})
export class RegistroGeneralComponent {
  registros: any[] =[];
  registrosFiltrados: any[] = [];
  filtroForm!: FormGroup;
  columnaBusqueda: string | null = 'descripcion';  // Inicializado en 'cedula' por defecto
  paginaActual = 1;
  itemsPorPagina = 10;

  saldoActual = 0;

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.filtroForm = this.fb.group({
    tipoBusqueda: ['descripcion'],
    valorBusqueda: ['']
  });
  }

  ngOnInit() {
    this.obtenerRegistros();
  }

  obtenerRegistros() {
    this.registroService.obtenerRegistro().subscribe((data: any[]) => {
      this.registros = data;
      this.aplicarFiltros();
      this.saldoActual = this.registros[this.registros.length-1].saldo
    });
  }

  aplicarFiltros() {
    const tipoBusqueda = this.filtroForm.get('tipoBusqueda')?.value;
    const valorBusqueda = this.filtroForm.get('valorBusqueda')?.value;

    if (tipoBusqueda !== null && valorBusqueda !== null) {
      // Filtra los clientes
      this.registrosFiltrados = this.registros.filter(registros =>
        registros[tipoBusqueda].includes(valorBusqueda)
      );

      // Reinicia la paginación
      this.paginaActual = 1;
    }
  }

  seleccionarColumna() {
    this.aplicarFiltros();
  }

  onInputChange() {
    this.aplicarFiltros();
  }

  onPageChange(event: number) {
    this.paginaActual = event;
  }

  get paginas() {
    return Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
  }

  get paginasTotales() {
    return Math.ceil(this.registrosFiltrados.length / this.itemsPorPagina);
  }

  get registrosPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.registrosFiltrados.slice(inicio, fin);
  }
}
