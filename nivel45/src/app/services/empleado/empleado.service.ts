import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000'; // Cambia a tu URL real

  constructor(private http: HttpClient) {}

  insertarEmpleado(empleadoData: any): Observable<any> {
    const url = `${this.apiUrl}/insertar-empleado`;
    return this.http.post<any>(url, empleadoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  obtenerEmpleados(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-empleados`;
    return this.http.get<any[]>(url);
  }

  obtenerEmpleadoPorCedula(cedula: string): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-empleado/${cedula}`;
    return this.http.get<any[]>(url);
  }

  modificarEstadoEmpleado(empleadoData: any): Observable<any> {
    const url = `${this.apiUrl}/modificar-estado-empleado`;
    return this.http.post<any>(url, empleadoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  reincorporarEmpleado(empleadoData: any): Observable<any> {
    const url = `${this.apiUrl}/reincorporar-empleado`;
    return this.http.post<any>(url, empleadoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  modificarSueldoEmpleado(empleadoData: any): Observable<any> {
    const url = `${this.apiUrl}/modificar-sueldo-empleado`;
    return this.http.post<any>(url, empleadoData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  obtenerAnticiposEmpleado(idEmpleado: any, fecha: any): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-anticipos-empleado`;

    // Agrega los parámetros a la URL
    const params = new HttpParams()
      .set('idEmpleado', idEmpleado.toString())
      .set('fecha', fecha);

    return this.http.get<any[]>(url, { params })
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }
}
