import { Component, OnInit } from '@angular/core';

import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/cliente';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

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
    private messageService: MessagesService,
    private router: Router,
    private clienteService: ClientesService) { }

  ngOnInit(): void {
    this.listaClientes();
  }

  async listaClientes() {
    await this.clienteService.getClientes().subscribe((cliente) => {

      if (cliente.data) {
        this.allClientes = cliente.data;
      }
    });
  }

  removeCliente(id: number) {
    console.log(id);
    this.clienteService.removeCliente(id).subscribe((data) => {
      this.messageService.add("Cliente `${data}` excluído com sucesso.:");
      this.router.navigate(['/']);
    });
  }
}
