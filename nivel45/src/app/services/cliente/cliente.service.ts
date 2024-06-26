import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //url copiada 'http://186.43.220.127:8081'
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  insertarCliente(clienteData: any): Observable<any> {
    const url = `${this.apiUrl}/insertar-cliente`;
    return this.http.post<any>(url, clienteData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }

  obtenerClientes(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-clientes`;
    return this.http.get<any[]>(url);
  }

  obtenerCliente(cedula: string): Observable<any> {
    const url = `${this.apiUrl}/obtener-cliente/${cedula}`;
    return this.http.get<any>(url);
  }

  editarCliente(clienteData: any): Observable<any> {
    const url = `${this.apiUrl}/editar-cliente`;
    return this.http.post<any>(url, clienteData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }
}
