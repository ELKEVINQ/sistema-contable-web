import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FacturaService } from '../services/factura/factura.service';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfMake'; // Importa pdfMake
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // Importa pdfFonts

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent implements OnInit {

  facturas: any[] = [];
  facturasFiltradas: any[] = [];
  filtroForm!: FormGroup;
  columnaBusqueda: string | null = 'cedula';  // Inicializado en 'cedula' por defecto
  paginaActual = 1;
  itemsPorPagina = 10;
  constructor(private fb: FormBuilder, private facturaService: FacturaService, private router: Router) {
    this.filtroForm = this.fb.group({
      tipoBusqueda: ['cedula'],
      valorBusqueda: ['']
    });
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  anularFactura(factura: any) {
  }

  imprimirFactura(factura: any) {
    const documentDefinition: any = {
      pageSize: 'A4',
      watermark: { text: factura.estado, color: 'red', opacity: 0.3, bold: true, italics: false },
      styles: {
        header: {
          bold: true,
          fontSize: 12,
          margin: [0, 5, 0, 10],
        },
      },
      content: [
        'Factura de prueba',
        { text: 'Numero de factura: ' + factura.idFactura },
        { text: 'Cedula: ' + factura.cedula },
        { text: 'Nombres: ' + factura.nombres },
        { text: 'Fecha: ' + factura.fecha },
        { text: 'Total: ' + factura.total },
      ],
    };
    try {
      pdfMake.createPdf(documentDefinition).download('Factura:' + factura.idFactura);
    } catch (error) {
      console.error('Error al crear el PDF:', error);
    }
  }

  ngOnInit() {
    this.obtenerFacturas();
  }

  formatearFecha(str: string) {
    if (str.length > 10) {
      return str.substring(0, 10);
    } else {
      return str;
    }
  }

  obtenerFacturas() {
    this.facturaService.obtenerFacturas().subscribe((data: any[]) => {
      this.facturas = data;
      this.aplicarFiltros();
    });
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

      // Filtra las obras
      this.facturasFiltradas = this.facturas.filter(facturas =>
        facturas[tipoBusqueda].toLowerCase().includes(valorBusquedaLower)
      );

      // Reinicia la paginación
      this.paginaActual = 1;
    }
  }

  onPageChange(event: number) {
    this.paginaActual = event;
  }
  get paginas() {
    return Array.from({ length: this.paginasTotales }, (_, i) => i + 1);
  }
  get paginasTotales() {
    return Math.ceil(this.facturasFiltradas.length / this.itemsPorPagina);
  }
  get facturasPaginadas() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.facturasFiltradas.slice(inicio, fin);
  }

}
