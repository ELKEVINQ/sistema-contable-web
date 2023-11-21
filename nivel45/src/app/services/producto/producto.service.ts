import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000'; // Cambia a tu URL real

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
}
