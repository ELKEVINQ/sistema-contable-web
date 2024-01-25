import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'http://186.43.220.127:8081';

  constructor(private http: HttpClient) { }

  insertarProveedor(proveedorData: any): Observable<any> {
    const url = `${this.apiUrl}/insertar-proveedor`;
    return this.http.post<any>(url, proveedorData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  obtenerProveedores(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-proveedores`;
    return this.http.get<any[]>(url);
  }

  obtenerProveedorPorNombre(nombre: string): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-proveedor/${nombre}`;
    return this.http.get<any[]>(url);
  }

  obtenerProveedorPorId(idProveedor: string): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-proveedor-id/${idProveedor}`;
    return this.http.get<any[]>(url);
  }

  //Por añadir
  editarProveedor(proveedorData: any){
    const url = `${this.apiUrl}/editar-proveedor`;
    return this.http.post<any>(url, proveedorData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }
}
