import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiIbgeServiceService {

	constructor(
		private http: HttpClient
	) { }

	getUf() {
		const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

		return this.http.get(url);
	}

	getCitiesByUf(uf: string): Observable<any> {
		const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`;

		return this.http.get(url);
	}
}
