import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
	selector: 'app-new-cliente',
	templateUrl: './new-cliente.component.html',
	styleUrls: ['./new-cliente.component.css']
})

export class NewClienteComponent implements OnInit {
	btnText = "Salvar";

	constructor(
        private clienteService: ClientesService,
        private messageService: MessagesService,
    ) { }

    ngOnInit(): void {
    }

    async createHandler(cliente: Cliente) {
        const formData = new FormData();

        formData.append("id", cliente.id?.toString() || "");
        formData.append("cpf", cliente.cpf.toString() || "");
        formData.append("nome", "cliente.nome" || "");
        formData.append("dataNascimento", "cliente.dataNascimento" || "");
        formData.append("sexo", "cliente.sexo" || "");
        formData.append("cep", cliente.cep.toString() || "");
        formData.append("estado", "cliente.estado" || "");
        formData.append("cidade", "cliente.cidade" || "");
        formData.append("endereco", "cliente.endereco" || "");

        try {
            await this.clienteService.createCliente(formData).subscribe();

            this.messageService.add("Cliente adicionado com sucesso.");

        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
        }
    }
}
