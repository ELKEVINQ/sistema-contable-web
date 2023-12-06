import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:3000'; // Cambia a tu URL real

  constructor(private http: HttpClient) {}

  insertarFactura(facturaData: any, detallesFactura: any[]): Observable<any> {
    const url = `${this.apiUrl}/insertar-factura`;
    const body = { factura: facturaData, detalles: detallesFactura };
  
    return this.http.post<any>(url, body)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error;
        })
      );
  }
}
