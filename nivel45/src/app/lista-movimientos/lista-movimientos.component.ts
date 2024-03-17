import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrl: './lista-movimientos.component.css'
})
export class ListaMovimientosComponent {
  registros: any[] = [];
  propietario: string = '';
  totalDeudaOriginal: number = 0;  // Nueva variable para almacenar el total original
  abonoActual: number = 0;
  saldo: number[] = [];
  abono: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService
  ) { }

  ngOnInit(): void {
    this.obtenerMovimientos(this.route.snapshot.queryParams['idDeuda']);
    this.propietario = this.route.snapshot.queryParams['propietario'];
    this.totalDeudaOriginal = parseFloat(this.route.snapshot.queryParams['valor']);
  }

  obtenerMovimientos(idDeuda: any) {
    this.registroService.obtenerMovimientos(idDeuda).subscribe((data: any[]) => {
      this.registros = data;
      this.calcular()
    });
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
      this.abono.push(gastoSumado)
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
