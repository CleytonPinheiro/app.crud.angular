import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
	private baseApiUrl = environment.baseApiUrl;
	private apiUrl = `${this.baseApiUrl}/clientes`;

	constructor(private http: HttpClient) { }

	createCliente(formData: FormData): Observable<FormData> {

		return this.http.post<FormData>(this.apiUrl, formData);
	}
}
