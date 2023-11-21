import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from '../services/proveedor/proveedor.service';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent {
  proveedores: any[] = [];
  proveedoresFiltrados: any[] = [];
  paginaActual = 1;
  itemsPorPagina = 10;
  nombre: string = '';
  telefono: string = '';
  celular: string = '';
  direccion: string = '';

  constructor(private route: ActivatedRoute, private proveedorService: ProveedorService ) { }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedorService.obtenerProveedores().subscribe((data: any[]) => {
      this.proveedores = data;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.proveedoresFiltrados = this.proveedores;
    this.paginaActual = 1;
  }

  onPageChange(event: number) {
    this.paginaActual = event;
  }

  get paginasTotales() {
    return Math.ceil(this.proveedoresFiltrados.length / this.itemsPorPagina);
  }

  get paginas() {
    return Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
  }

  get anticiposPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.proveedoresFiltrados.slice(inicio, fin);
  }
}
