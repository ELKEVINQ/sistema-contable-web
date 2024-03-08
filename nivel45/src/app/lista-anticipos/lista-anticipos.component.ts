import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-anticipos',
  templateUrl: './lista-anticipos.component.html',
  styleUrls: ['./lista-anticipos.component.css']
})
export class ListaAnticiposComponent implements OnInit {
  registros: any[] = [];
  registrosFiltrados: any[] = [];
  paginaActual = 1;
  itemsPorPagina = 10;
  nombres: string = '';
  apellidos: string = '';
  totalObraOriginal: number = 0;  // Nueva variable para almacenar el total original
  totalObraActual: number = 0;    // Nueva variable para mantener un seguimiento del total actual
  gastoActual: number = 0;
  saldos: string[] = [];  // Nuevo arreglo para almacenar los saldos
  gastos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService
  ) { }

  ngOnInit(): void {
    this.obtenerRegistro(this.route.snapshot.queryParams['idObra']);
    this.nombres = this.route.snapshot.queryParams['nombres'];
    this.apellidos = this.route.snapshot.queryParams['apellidos'];
    this.totalObraOriginal = parseFloat(this.route.snapshot.queryParams['total']);
    this.totalObraActual = this.totalObraOriginal;
  }

  obtenerRegistro(idObra: any) {
    this.registroService.obtenerRegistroObra(idObra).subscribe((data: any[]) => {
      this.registros = data;
      this.aplicarFiltros();
    });
  }

  aplicarFiltros() {
    this.registrosFiltrados = this.registros;
    this.paginaActual = 1;
  }

  onPageChange(event: number) {
    this.paginaActual = event;
  }

  get paginasTotales() {
    return Math.ceil(this.registrosFiltrados.length / this.itemsPorPagina);
  }

  get paginas() {
    return Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
  }

  get registrosPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.registrosFiltrados.slice(inicio, fin);
  }

  calcularGasto(valorGasto: number, index: number): string {
    if (valorGasto === null) {
      return "0.00";
    } else {

      // Si el saldo para esta fila ya ha sido calculado, devuelve el valor almacenado
      if (this.gastos[index] !== undefined) {
        return this.gastos[index];
      }

      // Calcula el saldo
      this.gastoActual += valorGasto;

      // Almacena el saldo calculado en el arreglo
      this.gastos[index] = this.gastoActual.toFixed(2);

      // Retorna el saldo actualizado
      return this.gastos[index];
    }
  }

  calcularSaldo(valorAnticipo: number, index: number): string {
    if (valorAnticipo === null) {
      return "0.00";
    } else {
      // Si el saldo para esta fila ya ha sido calculado, devuelve el valor almacenado
      if (this.saldos[index] !== undefined) {
        return this.saldos[index];
      }

      // Calcula el saldo
      this.totalObraActual -= valorAnticipo;

      // Almacena el saldo calculado en el arreglo
      this.saldos[index] = this.totalObraActual.toFixed(2);

      // Retorna el saldo actualizado
      return this.saldos[index];
    }
  }

  regular(valor: any): string {
    if (valor === null) {
      return "0.00"
    } else {
      if (valor % 2 !== 0) {
        return valor;
      }
      return valor+".00";
    }
  }
}
