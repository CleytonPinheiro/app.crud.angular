import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDadosService {

  constructor() { }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
