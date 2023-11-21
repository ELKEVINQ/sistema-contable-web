import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from '../services/producto/producto.service';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake'; // Importa pdfMake
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // Importa pdfFonts

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  filtroForm!: FormGroup;
  columnaBusqueda: string | null = 'nombre';  // Inicializado en 'nombre' por defecto
  paginaActual = 1;
  itemsPorPagina = 10;
  producto: any; // Variable para almacenar el producto seleccionado
  cantidad: number = 1;
  modalSwitch = false;
  qrImageUrl: string | null = '';

  constructor(private fb: FormBuilder, private productoService: ProductoService, private router: Router) {
    this.filtroForm = this.fb.group({
      tipoBusqueda: ['nombre'],
      valorBusqueda: ['']
    });
  }

  abrirModal(producto: any, qrData: string) {
    this.modalSwitch = true;
    this.producto = producto;

    // Genera la URL del QR y guárdala en una propiedad
    this.qrImageUrl = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${producto.idProducto}`;
    this.loadImageAsDataUrl(this.qrImageUrl);
  }

  cerrarModal() {
    console.log("Cerrando modal");
    this.modalSwitch = false;
  }

  loadImageAsDataUrl(imageUrl: string) {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(img, 0, 0);
        this.qrImageUrl = canvas.toDataURL('image/png');
      }
    };
  }

  imprimirQr() {
    const cantidadQR = this.cantidad;
    if (!this.qrImageUrl) {
      console.error('URL del código QR no disponible');
      return;
    }
  
    // Define documentDefinition como un objeto de tipo any
    const documentDefinition: any = {
      pageSize: 'A4',
      content: [],
    };
  
    const cantidadPorFila = 7; // Ajusta la cantidad de códigos QR por fila según tus necesidades
    const filas: any[][] = [];
  
    for (let i = 0; i < cantidadQR; i++) {
      const celda = {
        image: this.qrImageUrl,
        width: 64,
        margin: [0, 0], // Ajusta el margen entre los códigos QR
      };
  
      // Crea una nueva fila si es necesario
      if (i % cantidadPorFila === 0) {
        filas.push([]);
      }
  
      // Agrega la celda a la última fila
      filas[filas.length - 1].push(celda);
    }
  
    // Asegura que cada fila tenga la misma cantidad de celdas
    for (const fila of filas) {
      while (fila.length < cantidadPorFila) {
        fila.push({ text: '', margin: [0, 0] });
      }
    }
  
    // Agrega las filas a una tabla
    const table = {
      table: {
        widths: Array(cantidadPorFila).fill('*'), // Divide la página en filas del mismo ancho
        body: filas,
      },
    };
  
    documentDefinition.content.push(table);
  
    // Genera el PDF después de agregar todas las imágenes
    pdfMake.createPdf(documentDefinition).download('qr_codes.pdf');
  }

  addExistencias(productos: any) {
    this.router.navigate(['/p/añadir-existencias'], { queryParams: { idProducto: productos.idProducto, existencias: productos.existencias } });
  }

  guardarEstado(productos: any) {
    this.router.navigate(['/p/guardar estado'], { queryParams: { idProducto: productos.idProducto, estado: productos.estado } });
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe((data: any[]) => {
      this.productos = data;
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

      // Filtra los productos
      this.productosFiltrados = this.productos.filter(producto =>
        producto[tipoBusqueda].toLowerCase().includes(valorBusquedaLower)
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
    return Math.ceil(this.productosFiltrados.length / this.itemsPorPagina);
  }

  get productosPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.productosFiltrados.slice(inicio, fin);
  }
}
