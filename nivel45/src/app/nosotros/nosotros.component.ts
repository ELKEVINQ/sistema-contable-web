import { Component, OnInit } from '@angular/core';
import Integer from '@zxing/library/esm/core/util/Integer';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {

  descripciones: String[][] = [
    [],
    []
  ];

  descripcionCabina: String = "Cabina";
  descripcionTecho: String = "Techo";
  descripcionPasamano: String = "Pasamano";
  descripcionEscalera: String = "Escalera";
  descripcionPuerta: String = "Puerta";

  rutaCabina: String = "";
  rutaTecho: String = "";
  rutaPasamano: String = "";
  rutaEscalera: String = "";
  rutaPuerta: String = "";

  //the items for both arrays will be in this order: cabina, techo, pasamano, escalera, puerta
  carrouselActualPosition: number[] = [0,0,0,0,0];
  carrouselItemCounter: number[] = [0,0,0,0,0];


  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.descripciones.length; i++) {
      if (this.descripciones[0][0] === "cabina") {
        this.carrouselItemCounter[0] = this.carrouselItemCounter[0] + 1;
      } else if (this.descripciones[0][0] === "techo") {
        this.carrouselItemCounter[1] = this.carrouselItemCounter[1] + 1;
      }else if (this.descripciones[0][0] === "pasamano") {
        this.carrouselItemCounter[2] = this.carrouselItemCounter[2] + 1;
      }else if (this.descripciones[0][0] === "escalera") {
        this.carrouselItemCounter[3] = this.carrouselItemCounter[3] + 1;
      }else if (this.descripciones[0][0] === "puerta") {
        this.carrouselItemCounter[4] = this.carrouselItemCounter[4] + 1;
      }
    }
  }

  bodySelector(type: String, left: boolean){
    switch (type){
      case "cabinas":
        if(left && this.carrouselActualPosition[0] > 0){
          this.descripcionCabina = this.descripciones[0][0];
        }
        break;
      default:

        break;
    }
  }

}
