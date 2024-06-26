import { Component } from '@angular/core';
import { ObraService } from '../services/obras/obras.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-obras',
  templateUrl: './lista-obras.component.html',
  styleUrls: ['./lista-obras.component.css']
})
export class ListaObrasComponent {
  obras: any[] = [];
  obrasFiltradas: any[] = [];
  filtroForm!: FormGroup;
  columnaBusqueda: string | null = 'cedula';  // Inicializado en 'cedula' por defecto
  paginaActual = 1;
  itemsPorPagina = 10;
  estadoTemporal: string = "";

  constructor(private fb: FormBuilder, private obraService: ObraService, private router: Router) {
    this.filtroForm = this.fb.group({
    tipoBusqueda: ['cedula'],
    valorBusqueda: ['']
  });
  }

  irAAddAnticipo(obra: any) {
    this.router.navigate(['/p/add-anticipo'], { queryParams: { idObra: obra.idObra, cedula: obra.cedula, nombres: obra.nombres, apellidos: obra.apellidos, numero: obra.numero } });
  }

  irAListaAnticipos(obra: any) {
    const queryParams = {
        idObra: obra.idObra,
        nombres: obra.nombres,
        apellidos: obra.apellidos,
        total: obra.total
    };

    this.router.navigate(['/p/lista-anticipos'], { queryParams });
  }

  ngOnInit() {
    this.obtenerObras();
  }

  obtenerObras() {
    this.obraService.obtenerObras().subscribe((data: any[]) => {
      this.obras = data;
      this.aplicarFiltros();
    });
  }

  onEstadoChange(event: any) {
    this.estadoTemporal = event.target.value;
  }

  actualizarEstado(obras: any) {
    const idObra = obras.idObra;
    const estado = this.estadoTemporal;

    if(this.estadoTemporal === ""){
      alert("No se modifico el estado previamente")
      return;
    }else{
      console.log("idObra :"+idObra)
      console.log("estado :"+estado)
    }

    this.obraService.modificarObra( { idObra, estado } ).subscribe((response: { success: any; }) => {
      if (response.success){
        alert('Estado modificado correctamente')
        this.reloadPage();
      }else{
        alert('Fallo al modificar el estado')
      }
      this.estadoTemporal = "";
    });
  }

  reloadPage() {
    // Realiza la recarga de la página sin cerrar la sesión
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
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
      this.obrasFiltradas = this.obras.filter(obras =>
        obras[tipoBusqueda].toLowerCase().includes(valorBusquedaLower)
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
    return Math.ceil(this.obrasFiltradas.length / this.itemsPorPagina);
  }

  get obrasPaginadas() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    return this.obrasFiltradas.slice(inicio, fin);
  }
}
