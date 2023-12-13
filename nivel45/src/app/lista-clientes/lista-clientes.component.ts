// lista-clientes.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from '../services/cliente/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  filtroForm!: FormGroup;
  columnaBusqueda: string | null = 'cedula';  // Inicializado en 'cedula' por defecto
  paginaActual = 1;
  itemsPorPagina = 10;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private router: Router) {
    this.filtroForm = this.fb.group({
      tipoBusqueda: ['cedula'],
      valorBusqueda: ['']
    });
  }

  ngOnInit() {
    this.obtenerClientes();
  }

  irAEditar(cliente: any) {
    this.router.navigate(['/p/editar-cliente'], {
      queryParams: {
        cedula: cliente.cedula,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        telefono: cliente.telefono,
        correo: cliente.correo,
        direccion: cliente.direccion
      }
    });
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe((data: any[]) => {
      this.clientes = data;
      this.aplicarFiltros();  // Aplicar filtros al obtener nuevos datos
    });
  }

  buscarCliente() {
    this.aplicarFiltros();
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

      // Filtra los clientes
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente[tipoBusqueda].toLowerCase().includes(valorBusquedaLower)
      );

      // Reinicia la paginación
      this.paginaActual = 1;
    }
  }

  onPageChange(event: number) {
    this.paginaActual = event;
  }

  get paginasTotales() {
    return Math.ceil(this.clientesFiltrados.length / this.itemsPorPagina);
  }

  get paginas() {
    return Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
  }

  get clientesPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.clientesFiltrados.slice(inicio, fin);
  }
}
