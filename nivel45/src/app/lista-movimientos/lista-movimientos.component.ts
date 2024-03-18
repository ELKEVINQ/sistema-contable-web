import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrl: './lista-movimientos.component.css'
})
export class ListaMovimientosComponent {
  abonos: any[] = [];
  propietario: string = '';
  totalDeudaOriginal: number = 0;  // Nueva variable para almacenar el total original
  abonoActual: number = 0;
  abonosSumados: number[] = [];

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
      this.abonos = data;
      this.calcular()
    });
  }


  calcular() {
    let abonosSumados = 0
    for (let i = 0; i < this.abonos.length; i++) {
      let abono = 0
      if (this.abonos[i].valor != null) {
        abono = this.abonos[i].valor
      }
      if (this.abonos[i].gasto != null) {
        abono = this.abonos[i].gasto;
      }
      abonosSumados += abono
      this.abonosSumados.push(abonosSumados)
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
