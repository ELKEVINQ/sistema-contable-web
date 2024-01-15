import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturaService } from '../services/factura/factura.service';
import { ClienteService } from '../services/cliente/cliente.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../services/producto/producto.service';
import { Subject, of } from 'rxjs';
import { ProductoTabla } from '../interfaces/ProductoTabla'
import { ObraService } from '../services/obras/obras.service';

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.css']
})

export class FacturarComponent {
  facturaForm!: FormGroup;
  cuerpoFacturaForm!: FormGroup;
  addProductoFormModal!: FormGroup;
  productos: any[] = [];
  productosTabla: ProductoTabla[] = [];
  cedula: string = '';
  nombres: string = '';

  idObra: string = '';
  obras: any[] = [];
  perteneceObra: boolean = false;

  mostrarDropdown = false;
  //modal
  nombreModal: string = '';
  cantidadModal: string = '';
  proveedorModal: string = '';
  precioUnitarioModal: string = '';
  precioFinalModal: string = '';
  //fin Modal

  //variable de control
  subTotalFactura: number = 0;
  descuentoFactura: number = 0;
  ivaFactura: number = 0;
  totalFactura: number = 0;

  mostrarCamara: boolean = false;
  capturaTrigger: Subject<void> = new Subject<void>();
  facturacionModalSwitch: boolean = false;
  public cameras: MediaDeviceInfo[] = [];
  public myDevice!: MediaDeviceInfo;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private facturaService: FacturaService, private clienteService: ClienteService, private productoService: ProductoService, private obraService: ObraService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((data: any[]) => {
      this.productos = data;
    });
    this.facturaForm = this.fb.group({
      cedula: [''],
      nombres: ['', Validators.required],
      fecha: [''],
      subtotal: [''],
      iva: [''],
      descuento: [''],
      total: [''],
      perteneceObra: [''],
    });
    this.cuerpoFacturaForm = this.fb.group({
      precioS: [''],
      cantidadS: [''],
      cantidad: [''],
      descripcion: [''],
      precioU: [''],
      precioT: [''],
    });

    this.addProductoFormModal = this.fb.group({
      nombreModal: ['', Validators.required],
      cantidadModal: ['', Validators.required],
      proveedorModal: [''],
      precioUnitarioModal: ['', Validators.required],
      precioFinalModal: [''],
    });

    this.cuerpoFacturaForm.get('precioU')?.valueChanges.subscribe((nuevoValorPrecioU) => {
      this.actualizarPrecioT();
    });

    this.cuerpoFacturaForm.get('cantidad')?.valueChanges.subscribe((nuevoValorCantidad) => {
      this.actualizarPrecioT();
    });

    this.addProductoFormModal.get('cantidadModal')?.valueChanges.subscribe((nuevoValorCantidad) => {
      if (this.addProductoFormModal.get('cantidadModal')?.value !== '') {
        this.actualizarPrecioF();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toogleObra() {
    if (this.facturaForm.get('cedula')?.value.length < 10){
      this.perteneceObra = false;
      this.facturaForm.get('perteneceObra')?.setValue(this.perteneceObra);
      return;
    }else{
      this.perteneceObra = !this.perteneceObra;
      this.facturaForm.get('perteneceObra')?.setValue(this.perteneceObra);
    }
  }

  abrirListaObras(cedula: any) {
    if (cedula === ""){
      console.log("regreso")
      return
    }else{
      this.obraService.obtenerObrasCedula(cedula).subscribe((data: any[]) => {
        // Filtrar las obras con estado "En Proceso"
        const obrasEnProceso = data.filter(obra => obra.estado === 'En Proceso');

        // Agregar las obras filtradas al array 'obras'
        this.obras.push(...obrasEnProceso);
      });
    }
  }

  seleccionarObra(obra: any) {
    // Aquí puedes realizar cualquier acción que desees con la obra seleccionada
    this.idObra = obra.idObra;
    this.toogleObra();
    // Puedes, por ejemplo, abrir un modal, navegar a otra página, etc.
  }

  actualizarTotalFactura(valorPorSumar: number) {
    this.subTotalFactura = this.subTotalFactura + valorPorSumar;
    this.subTotalFactura = parseFloat(this.subTotalFactura.toFixed(2));
    this.ivaFactura = this.subTotalFactura * 0.12;
    this.ivaFactura = parseFloat(this.ivaFactura.toFixed(2));
    this.totalFactura = this.subTotalFactura + (this.ivaFactura);
    this.totalFactura = parseFloat(this.totalFactura.toFixed(2));
  }

  actualizarPrecioT() {
    const cantidad = parseFloat(this.cuerpoFacturaForm.get('cantidad')?.value);
    const precioU = parseFloat(this.cuerpoFacturaForm.get('precioU')?.value);

    if (cantidad !== null && precioU !== null && !isNaN(cantidad) && !isNaN(precioU)) {
      const precioT = parseFloat((cantidad * precioU).toFixed(2));

      this.cuerpoFacturaForm.patchValue({
        precioT: precioT
      });
    } else {
      this.cuerpoFacturaForm.get('precioT')?.setValue('');
    }
  }

  actualizarPrecioF() {
    console.log("inicio actualizacion de precio");
    if (this.addProductoFormModal.get('nombreModal')?.value !== '') {
      const cantidad = parseFloat(this.addProductoFormModal.get('cantidadModal')?.value);
      const precioU = parseFloat(this.addProductoFormModal.get('precioUnitarioModal')?.value);

      if (cantidad !== null && precioU !== null && !isNaN(cantidad) && !isNaN(precioU)) {
        const precioT = parseFloat((cantidad * precioU).toFixed(2));

        this.addProductoFormModal.patchValue({
          precioFinalModal: precioT
        });
        console.log("Actualizacion correcta");
      } else {
        this.addProductoFormModal.get('precioFinalModal')?.setValue('');
        console.log("Actualizacion fallida");
      }
    } else {
      alert('Primero debe seleccionar un producto.');
      this.addProductoFormModal.get('cantidadModal')?.setValue('');
    }
  }

  abrirModal(): void {
    this.facturacionModalSwitch = true;
  }

  cerrarModal(): void {
    this.facturacionModalSwitch = false;
    // También puedes limpiar los campos del formulario aquí
    this.addProductoFormModal.reset();
  }

  camerasFoundHandler(cameras: MediaDeviceInfo[]) {
    this.cameras = cameras;

    // Seleccionar la primera cámara por defecto
    if (this.cameras.length > 0) {
      this.selectCamera();
    }
  }

  selectCamera() {
    if (this.cameras.length > 0) {
      this.myDevice = this.cameras[0];
    }
    this.mostrarCamara = true;
  }

  scanSuccessHandler(event: string) {
    this.buscarProductoPorId(event);
    console.log(event);
  }

  scanErrorHandler(event: any) {
    console.log("Hubo un error en el scanner " + event);
  }

  formatToMySQLDate(date: NgbDateStruct): string {
    if (date) {
      const year = date.year;
      const month = date.month.toString().padStart(2, '0');
      const day = date.day.toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  filtrarProductos(nombre: string) {
    return this.productos.filter(producto => producto.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }

  inputFocus() {
    this.mostrarDropdown = true;
  }

  inputBlur() {
    // Espera un breve momento antes de ocultar el dropdown, para permitir hacer clic en él
    setTimeout(() => {
      this.mostrarDropdown = false;
    }, 200);
  }

  seleccionarProducto(producto: any) {
    this.addProductoFormModal.patchValue({
      proveedorModal: producto.proveedor,
      precioUnitarioModal: producto.precio
    });

    // Puedes asignar el valor al campo nombreModal si también deseas
    this.addProductoFormModal.get('nombreModal')?.setValue(producto.nombre);
    if (this.addProductoFormModal.get('cantidadModal')?.value !== '') {
      this.addProductoFormModal.get('precioFinalModal')?.setValue(this.addProductoFormModal.get('cantidadModal')?.value * producto.precio);
    }

    // Oculta el dropdown después de seleccionar un producto
    this.mostrarDropdown = false;
  }

  mostrar: boolean = false;

  mostrarCamposAdicionales() {
    this.mostrar = !this.mostrar;
  }

  agregarItemEspecial() {
    if (this.cuerpoFacturaForm.get("cantidad")?.value !== '' && this.cuerpoFacturaForm.get("descripcion")?.value !== '' && this.cuerpoFacturaForm.get("precioU")?.value !== '' && this.cuerpoFacturaForm.get("precioT")?.value !== '') {
      // Obtén los valores del formulario
      const cantidad = this.cuerpoFacturaForm.get('cantidad')?.value;
      const descripcion = this.cuerpoFacturaForm.get('descripcion')?.value;
      const precioU = this.cuerpoFacturaForm.get('precioU')?.value;
      const precioT = this.cuerpoFacturaForm.get('precioT')?.value;

      // Crea un objeto ProductoTabla
      const nuevoProducto: ProductoTabla = {
        cantidad: cantidad,
        nombre: descripcion,
        precioUnitario: precioU,
        precioTotal: precioT,
      };

      this.actualizarTotalFactura(precioT);
      // Agrega el nuevo producto a la lista
      this.productosTabla.push(nuevoProducto);

      // Limpia el formulario o realiza otras acciones necesarias
      this.cuerpoFacturaForm.reset();
    }
  }

  agregarItemNormal() {
    if (this.addProductoFormModal.get('cantidadModal')?.value !== '' && this.addProductoFormModal.get('nombreModal')?.value !== '' && this.addProductoFormModal.get('precioUnitarioModal')?.value !== '' && this.addProductoFormModal.get('precioFinalModal')?.value !== '') {
      const cantidad = this.addProductoFormModal.get('cantidadModal')?.value;
      const descripcion = this.addProductoFormModal.get('nombreModal')?.value;
      const precioU = this.addProductoFormModal.get('precioUnitarioModal')?.value;
      const precioT = this.addProductoFormModal.get('precioFinalModal')?.value;

      // Crea un objeto ProductoTabla
      const nuevoProducto: ProductoTabla = {
        cantidad: cantidad,
        nombre: descripcion,
        precioUnitario: precioU,
        precioTotal: precioT,
      };

      this.actualizarTotalFactura(precioT);
      // Agrega el nuevo producto a la lista
      this.productosTabla.push(nuevoProducto);
      this.cerrarModal();
    }
  }

  buscarProductoPorId(id: any) {
    this.productoService.obtenerProductoPorId(id).subscribe((producto) => {
      // Obtener el nombre del producto
      console.log("nombre producto: " + producto[0].nombre)
      this.addProductoFormModal.get("nombreModal")?.setValue(producto[0].nombre);
    });
  }

  onInputChange() {
    if (this.facturaForm.get('cedula')?.value.length === 10) {
      this.cedula = this.facturaForm.get('cedula')?.value;
      this.clienteService.obtenerCliente(this.cedula).subscribe((data: any) => {
        // Filtrar el cliente por la cédula
        const cliente = data;
        this.facturaForm.get('nombres')?.setValue(cliente[0].nombres + " " + cliente[0].apellidos);
      });
      this.abrirListaObras(this.cedula);
    } else {
      this.facturaForm.get('nombres')?.setValue('');
    }
  }

  validarEntrada(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);

    // Solo permitir números y puntos
    const pattern = /^[0-9.]+$/;

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  checkBeforeSend(): boolean {
    if (this.facturaForm.get("cedula")?.value !== '' && this.facturaForm.get("nombres")?.value !== '' && this.facturaForm.get("fecha")?.value !== ''
      && this.productosTabla.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  guardarFactura() {
    // Verificar si el formulario es válido
    if (this.checkBeforeSend()) {
      // Obtener los valores del formulario
      const { cedula, fecha } = this.facturaForm.value;

      // Formatear la fecha a un formato compatible con MySQL
      const fechaFormateada = this.formatToMySQLDate(fecha);

      // Crear el objeto de factura
      const facturaData = {
        idFactura: '0000-0000-0004',
        cedula,
        fecha: fechaFormateada,
        subtotal: this.subTotalFactura,
        iva: this.ivaFactura,
        descuento: this.descuentoFactura,
        total: this.totalFactura,
        estado: "Valida",
        idObra: this.idObra,
        // Agrega aquí los demás campos necesarios para la factura
      };

      // Realizar la solicitud al servicio de facturas para insertar la factura y sus detalles
      this.facturaService.insertarFactura(facturaData, this.productosTabla).subscribe((response: any) => {
        if (response.success) {
          alert('Factura insertada correctamente');
        } else {
          alert('Error al insertar la factura');
        }
      });
      console.log("Datos Factura: " + facturaData);
      console.log("Datos detalle " + this.productosTabla)
    } else {
      alert('Alguno de los campos está vacío');
    }
  }
}
