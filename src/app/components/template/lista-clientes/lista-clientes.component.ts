import { Component, OnInit } from '@angular/core';

import { ClientesService } from 'src/app/services/clientes.service';
import { FormatDadosService } from 'src/app/services/format-dados.service';
import { Cliente } from 'src/app/cliente';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  allClientes: Cliente[] = [];
  dataNascimento!: string;
  dataCadastro!: string;

  constructor(
    private formatDados: FormatDadosService,
    private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((cliente) => {
      const data = cliente.data;

      data.map((item) => {
        this.dataCadastro = this.formatDados.formatDate(item.created_at);
        this.dataNascimento = this.formatDados.formatDate(item.dataNascimento);
      });

      this.allClientes = data;
    });
  }
}
