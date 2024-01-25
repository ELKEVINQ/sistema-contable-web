import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://186.43.220.127:8081'; // Cambia esto con la URL de tu servidor backend

  constructor(private http: HttpClient) {}

  autenticar(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/autenticar`, { usuario, password });
  }
}
