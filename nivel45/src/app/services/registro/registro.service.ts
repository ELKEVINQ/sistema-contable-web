import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  //url copiada 'http://186.43.220.127:8081'
  private apiUrl = 'http://localhost:3000';

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

  insertarDeuda(deudaData: any) {
    const url = `${this.apiUrl}/insertar-deuda`;
    return this.http.post<any>(url, deudaData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  insertarMovimiento(movimientoData: any) {
    const url = `${this.apiUrl}/insertar-movimiento`;
    return this.http.post<any>(url, movimientoData)
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

  pagarDeuda(deudaData: any) {
    const url = `${this.apiUrl}/insertar-gasto`;
    return this.http.post<any>(url, deudaData)
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

  obtenerRegistroObra(idObra: string): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-registro-obra/${idObra}`;
    return this.http.get<any[]>(url);
  }

  obtenerDeudas(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-deudas`;
    return this.http.get<any[]>(url);
  }

  obtenerMovimientos(idDeuda: any): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-movimientos/${idDeuda}`;
    return this.http.get<any[]>(url);
  }
}
