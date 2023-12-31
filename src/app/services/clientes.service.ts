import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Response } from '../Response';
import { Cliente } from '../cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/clientes`;

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Response<Cliente[]>> {
    return this.http.get<Response<Cliente[]>>(this.apiUrl);
  }

  getClienteById(id: number): Observable<Response<Cliente>> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Response<Cliente>>(url);
  }

  updateCliente(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.put<FormData>(url, formData);
  }

  createCliente(formData: FormData): Observable<FormData> {

    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removeCliente(id: number) {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete(url);
  }
}
