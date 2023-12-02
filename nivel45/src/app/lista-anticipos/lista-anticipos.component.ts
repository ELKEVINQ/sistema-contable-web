import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-anticipos',
  templateUrl: './lista-anticipos.component.html',
  styleUrls: ['./lista-anticipos.component.css']
})
export class ListaAnticiposComponent implements OnInit {
  anticipos: any[] = [];
  anticiposFiltrados: any[] = [];
  paginaActual = 1;
  itemsPorPagina = 10;
  nombres: string = '';
  apellidos: string = '';
  totalObraOriginal: number = 0;  // Nueva variable para almacenar el total original
  totalObraActual: number = 0;    // Nueva variable para mantener un seguimiento del total actual
  saldos: number[] = [];  // Nuevo arreglo para almacenar los saldos

  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService
  ) { }

  ngOnInit(): void {
    this.obtenerAnticipos(this.route.snapshot.queryParams['idObra']);
    this.nombres = this.route.snapshot.queryParams['nombres'];
    this.apellidos = this.route.snapshot.queryParams['apellidos'];
    this.totalObraOriginal = parseFloat(this.route.snapshot.queryParams['total']);
    this.totalObraActual = this.totalObraOriginal;
  }

  obtenerAnticipos(idObra: any) {
    this.registroService.obtenerAnticipos(idObra).subscribe((data: any[]) => {
      this.anticipos = data;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.anticiposFiltrados = this.anticipos;
    this.paginaActual = 1;
  }

  onPageChange(event: number) {
    this.paginaActual = event;
  }

  get paginasTotales() {
    return Math.ceil(this.anticiposFiltrados.length / this.itemsPorPagina);
  }

  get paginas() {
    return Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
  }

  get anticiposPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.anticiposFiltrados.slice(inicio, fin);
  }

  calcularSaldo(valorAnticipo: number, index: number): number {
    // Si el saldo para esta fila ya ha sido calculado, devuelve el valor almacenado
    if (this.saldos[index] !== undefined) {
      return this.saldos[index];
    }

    // Calcula el saldo
    this.totalObraActual -= valorAnticipo;

    // Almacena el saldo calculado en el arreglo
    this.saldos[index] = this.totalObraActual;

    // Retorna el saldo actualizado
    return this.saldos[index];
  }
}