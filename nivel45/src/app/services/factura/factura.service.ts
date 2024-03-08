import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  //url copiada 'http://186.43.220.127:8081'
  private apiUrl = 'http://localhost:3000';

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

  obtenerFacturas(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-facturas`;
    return this.http.get<any[]>(url);
  }

  obtenerIdFactura(): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-idFactura`;
    return this.http.get<any[]>(url);
  }

  obtenerDetalleFactura(idFactura:any): Observable<any[]> {
    const url = `${this.apiUrl}/obtener-detalle-factura/${idFactura}`;
    return this.http.get<any[]>(url);
  }

  anularFactura(facturaData: any): Observable<any>{
    const url = `${this.apiUrl}/anular-factura`;
    return this.http.post<any>(url, facturaData)
    .pipe(
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        throw error; // Propaga el error para que otros puedan manejarlo
      })
    );
  }
}
