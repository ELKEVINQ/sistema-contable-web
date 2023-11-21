import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
