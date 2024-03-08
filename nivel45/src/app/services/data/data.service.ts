import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  //url copiada 'http://186.43.220.127:8081'
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  autenticar(usuario: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/autenticar`, { usuario, password });
  }
}
