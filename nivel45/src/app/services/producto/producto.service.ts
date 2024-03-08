import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { producto } from '../../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //url copiada 'http://186.43.220.127:8081'
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  insertarProducto(productoData: any): Observable<any> {
    const url = `${this.apiUrl}/insertar-producto`;
    return this.http.post<any>(url, productoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  obtenerProductos(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-productos`;
    return this.http.get<any[]>(url);
  }

  obtenerProductoPorId(idProducto: string): Observable<producto[]> {
    const url = `${this.apiUrl}/obtener-producto/${idProducto}`;
    return this.http.get<producto[]>(url);
  }

  addExistencias(productoData: any): Observable<any> {
    const url = `${this.apiUrl}/add-existencias-producto`;
    return this.http.post<any>(url, productoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  modificarPrecio(productoData: any): Observable<any> {
    const url = `${this.apiUrl}/modificar-precio-producto`;
    return this.http.post<any>(url, productoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }
}
