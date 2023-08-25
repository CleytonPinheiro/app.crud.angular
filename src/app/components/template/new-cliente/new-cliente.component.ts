import { Component, OnInit } from '@angular/core';

import { ViacepService } from 'src/app/services/viacep.service';
import { ApiIbgeServiceService } from 'src/app/services/api-ibge-service.service';
import { Cliente } from 'src/app/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
	selector: 'app-new-cliente',
	templateUrl: './new-cliente.component.html',
	styleUrls: ['./new-cliente.component.css']
})

export class NewClienteComponent implements OnInit {

    ufs: any = {};
    cep: string = "";
    endereço = {};
    btnText = "Salvar";

    constructor(
        private apiIbgeService: ApiIbgeServiceService,
        private viaCepService: ViacepService,
        private clienteService: ClientesService,
        private messageService: MessagesService,
    ) { }

    ngOnInit(): void {
        this.buscarUf();
    }

    buscarUf() {
        this.apiIbgeService.getUf().subscribe(
            (data) => {
                this.ufs = data;
            }
        );
    }

    buscarEndereço() {
        this.viaCepService.getEnderecoByCep(this.cep).subscribe(
            (data) => {
                this.endereço = data;
            }
        );
    }

    async createHandler(cliente: Cliente) {
        const formData = new FormData();

        formData.append("id", cliente.id?.toString() || "");
        formData.append("cpf", cliente.cpf.toString() || "");
        formData.append("nome", cliente.nome.toString() || "");
        formData.append("dataNascimento", cliente.dataNascimento.toString() || "");
        formData.append("sexo", cliente.sexo.toString() || "");
        formData.append("cep", cliente.cep.toString() || "");
        formData.append("estado", cliente.estado.toString() || "");
        formData.append("cidade", cliente.cidade.toString() || "");
        formData.append("endereco", cliente.endereco.toString() || "");

        try {
            await this.clienteService.createCliente(formData).subscribe(
                (response) => {
                    this.messageService.add("Cliente adicionado com sucesso.");
                }
            );
        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
        }
    }
}
