import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../services/registro/registro.service';

@Component({
  selector: 'app-lista-deuda',
  templateUrl: './lista-deuda.component.html',
  styleUrl: './lista-deuda.component.css'
})
export class ListaDeudaComponent {
  deudas: any[] = [];
  paginaActual = 1;
  itemsPorPagina = 10;
  nombres: string = '';
  apellidos: string = '';
  totalObraOriginal: number = 0;  // Nueva variable para almacenar el total original
  totalObraActual: number = 0;    // Nueva variable para mantener un seguimiento del total actual
  gastoActual: number = 0;
  saldo: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private registroService: RegistroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.registroService.obtenerDeudas().subscribe((data: any[]) => {
      this.deudas = data;
      for (let i = 0; i < this.deudas.length; i++) {
        this.saldo.push(0)
        this.registroService.obtenerMovimientos(this.deudas[i].idDeuda).subscribe((data: any[]) => {
          if (data != null) {
            let saldo = 0
            for (let j = 0; j < data.length; j++) {
              saldo += data[j].valor;
            }
            this.saldo[i] = saldo
          }
        })
      }
    })
  }

  pagarDeuda(deuda: any) {
    this.router.navigate(['/p/pagar-deuda'], {
      queryParams: {
        idDeuda: deuda.idDeuda,
        descripcion: deuda.descripcion,
        propietario: deuda.propietario,
        valor: deuda.valor
      }
    });
  }

  listaMovimientos(deuda: any) {
    this.router.navigate(['/p/lista-movimientos'], {
      queryParams: {
        idDeuda: deuda.idDeuda,
        propietario: deuda.propietario,
        valor: deuda.valor
      }
    });
  }

  aumentarDeuda (deuda: any){
    this.router.navigate(['/p/aumentar-deuda'], {
      queryParams: {
        idDeuda: deuda.idDeuda,
        propietario: deuda.propietario,
        valor: deuda.valor,
        saldo: this.saldo[this.saldo.length]
      }
    });
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
