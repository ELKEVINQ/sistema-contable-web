import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaCompraService {
  private apiUrl = 'http://186.43.220.127:8081';

  //Constructor
  constructor(private http: HttpClient) { }

  insertarFacturaCompra(facturaCompraData: any) {
    const url = `${this.apiUrl}/insertar-factura-compra`;
    return this.http.post<any>(url, facturaCompraData)
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud HTTP:', error);
          throw error; // Propaga el error para que otros puedan manejarlo
        })
      );
  }
}
