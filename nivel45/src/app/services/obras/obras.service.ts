// obra.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

interface ObrasResponse {
  cantidadObras: number;
}

@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private apiUrl = 'http://localhost:3000'; // Cambia a tu URL real

  constructor(private http: HttpClient) { }

  insertarObra(obraData: any): Observable<any> {
    const url = `${this.apiUrl}/insertar-obra`;
    return this.http.post<any>(url, obraData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  obtenerObras(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-obras`;
    return this.http.get<any[]>(url);
  }

  obtenerNumeroObras(cedula: string): Observable<ObrasResponse> {
    const url = `${this.apiUrl}/obtener-obra/${cedula}`;
    return this.http.get<ObrasResponse>(url);
  }

  obtenerObrasCedula(cedula: string): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-obras-cedula/${cedula}`;
    return this.http.get<any[]>(url);
  }

  modificarObra(obraData: any): Observable<any>{
    const url = `${this.apiUrl}/modificar-estado-obra`;
    return this.http.post<any>(url, obraData)
    .pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        throw error; // Propaga el error para que otros puedan manejarlo
      })
    );
  }
}
