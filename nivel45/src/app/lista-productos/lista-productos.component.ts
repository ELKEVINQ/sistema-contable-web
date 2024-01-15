import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from '../services/producto/producto.service';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfMake'; // Importa pdfMake
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // Importa pdfFonts
import {  EncodeHintType, BarcodeFormat, BrowserQRCodeSvgWriter, QRCodeWriter } from '@zxing/library';

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

  @ViewChild('qrCodeCanvas') qrCodeCanvas: ElementRef | undefined;

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
    this.generateQRCode(producto.idProducto);
  }

  generateQRCode(content: string) {
    const qrCodeWriter = new QRCodeWriter();
    const hints: Map<EncodeHintType, any> = null as any; // Asegura que hints sea de tipo Map
    const bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 350, 350, hints);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      const imageData = context.createImageData(bitMatrix.getWidth(), bitMatrix.getHeight());

      for (let y = 0; y < bitMatrix.getHeight(); y++) {
        for (let x = 0; x < bitMatrix.getWidth(); x++) {
          const index = (y * bitMatrix.getWidth() + x) * 4;
          imageData.data[index + 0] = bitMatrix.get(x, y) ? 0 : 255; // R
          imageData.data[index + 1] = bitMatrix.get(x, y) ? 0 : 255; // G
          imageData.data[index + 2] = bitMatrix.get(x, y) ? 0 : 255; // B
          imageData.data[index + 3] = 255; // A
        }
      }

      canvas.width = bitMatrix.getWidth();
      canvas.height = bitMatrix.getHeight();
      context.putImageData(imageData, 0, 0);

      // Convierte el canvas a un Data URL
      this.qrImageUrl = canvas.toDataURL('image/png');
    }
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
    const cantidad = prompt('Ingresa la cantidad a añadir:');
    const idProducto = productos.idProducto

    if (cantidad!== null) {
      const regex = /^\d+(\.\d+)?$/;
      if (regex.test(cantidad)) {
        this.productoService.addExistencias( { idProducto, cantidad } ).subscribe((response: { success: any; }) => {
          if (response.success){
            alert('Existencias modificadas correctamente')
          }else{
            alert('Fallo al modificar las existencias')
          }
        });
      }else{
        alert("No ingresaste un valor valido");
      }
    }else{
      alert("No ingresaste ningun valor")
    }
  }

  modificarPrecio(productos: any) {
    const precio = prompt('Ingresa el nuevo precio:');
    const idProducto = productos.idProducto

    if (precio!== null) {
      const regex = /^\d+(\.\d+)?$/;
      if (regex.test(precio)) {
        this.productoService.modificarPrecio( { idProducto, precio } ).subscribe((response: { success: any; }) => {
          if (response.success){
            alert('Precio modificado correctamente ' + precio)
          }else{
            alert('Fallo al modificar el precio')
          }
        });
      }else{
        alert("No ingresaste un valor valido");
      }
    }else{
      alert("No ingresaste ningun valor")
    }
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

  calcularPrecioIva(precio: any){
    const precioIva = parseFloat((precio * 1.12).toFixed(2));
    return precioIva;
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
