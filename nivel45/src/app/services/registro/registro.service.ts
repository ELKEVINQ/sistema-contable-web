import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:3000'; // Cambia a tu URL real

  //Constructor
  constructor(private http: HttpClient) { }

  insertarAnticipo(anticipoData: any) {
    const url = `${this.apiUrl}/insertar-anticipo`;
    return this.http.post<any>(url, anticipoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  insertarSaldo(saldoData: any) {
    const url = `${this.apiUrl}/insertar-saldo`;
    return this.http.post<any>(url, saldoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  insertarGasto(gastoData: any) {
    const url = `${this.apiUrl}/insertar-gasto`;
    return this.http.post<any>(url, gastoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  insertarRol(rolData: any) {
    const url = `${this.apiUrl}/insertar-rol`;
    return this.http.post<any>(url, rolData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  insertarRegistro(registroData: any) {
    const url = `${this.apiUrl}/insertar-gasto`;
    return this.http.post<any>(url, registroData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  obtenerRegistro(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-registros`;
    return this.http.get<any[]>(url);
  }

  obtenerAnticipos(idObra: string): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-anticipos/${idObra}`;
    return this.http.get<any[]>(url);
  }
}
