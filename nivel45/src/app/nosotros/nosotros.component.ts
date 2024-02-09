import { Component, OnInit } from '@angular/core';
import Integer from '@zxing/library/esm/core/util/Integer';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  descripcionCabina: String[][] = [
    ['Cabina con puerta batiente a 45°'],
    ['../../assets/trabajos/Cabina con puerta batiente a 45°.JPG']
  ];
  rutaCabinaActual: String = "";
  descripcionCabinaActual: String = "";

  descripcionTecho: String[][] = [
    [],
    []
  ];
  rutaTechoActual: String = "";
  descripcionTechoActual: String = "";

  descripcionPasamano: String[][] = [
    [],
    []
  ];
  rutaPasamanoActual: String = "";
  descripcionPasamanoActual: String = "";

  descripcionEscalera: String[][] = [
    [],
    []
  ];
  rutaEscaleraActual: String = "";
  descripcionEscaleraActual: String = "";

  descripcionPuerta: String[][] = [
    [],
    []
  ];
  rutaPuertaActual: String = "";
  descripcionPuertaActual: String = "";

  constructor() { }

  ngOnInit() {
    this.descripcionCabinaActual = this.descripcionCabina[0][0];
    this.rutaCabinaActual = this.descripcionCabina[0][1];
  }

  bodySelector(type: String, left: boolean) {

  }

}
