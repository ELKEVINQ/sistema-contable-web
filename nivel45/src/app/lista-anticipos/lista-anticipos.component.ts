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
  saldo: number[] = [];
  gasto: number[] = [];

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
      this.calcular()
    });
  }

  aplicarFiltros() {
    this.registrosFiltrados = this.registros;
    this.paginaActual = 1;
  }

  calcular() {
    let saldoSumado = 0
    let gastoSumado = 0
    for (let i = 0; i < this.registros.length; i++) {
      let saldo = 0
      let gasto = 0
      if (this.registros[i].valor != null) {
        saldo = this.registros[i].valor
      }
      if (this.registros[i].gasto != null) {
        gasto = this.registros[i].gasto;
      }
      saldoSumado = saldo + saldoSumado - gasto
      this.saldo.push(saldoSumado)
      gastoSumado += gasto
      this.gasto.push(gastoSumado)
    }
  }

  regular(valor: number): string {
    if (valor === null) {
      return "0.00"
    } else {
      if (valor % 2 !== 0) {
        return valor.toFixed(2) + "";
      }
      return valor + ".00";
    }
  }
}
