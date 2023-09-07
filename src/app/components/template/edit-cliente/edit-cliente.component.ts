import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from 'src/app/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import { ApiIbgeServiceService } from 'src/app/services/api-ibge-service.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  cliente!: Cliente;
  idCliente = Number(this.route.snapshot.paramMap.get('id'));
  btnText: string = 'Atualizar';
  ufs = {};

  constructor(
    private apiIbgeService: ApiIbgeServiceService,
    private route: ActivatedRoute,
    private clienteService: ClientesService
  ) { }

  ngOnInit(): void {

    this.clienteService.getClienteById(this.idCliente).subscribe((cliente) => {

      this.cliente = cliente.data;
    })

    this.buscarUf();
  }

  buscarUf() {
    this.apiIbgeService.getUf().subscribe(
      (data) => {
        this.ufs = data;
      }
    );
  }

  buscarCityByUf() {
    this.apiIbgeService.getCitiesByUf((this.ufs).toString()).subscribe((city) => {
      console.log(city);
    })
  }

  async getClienteById(id: number) {
    await this.clienteService.getClienteById(id).subscribe((cliente) => {

      this.cliente = cliente.data;
    });
  }

  async editHandler(clienteData: Cliente) {
    const idCliente = this.idCliente;

    const formData = new FormData();

    formData.append('cpf', clienteData.cpf.toString());
    formData.append('nome', clienteData.nome);
    formData.append('dataNascimento', clienteData.data_nascimento);

    formData.append('sexo', clienteData.sexo);
    formData.append('cep', clienteData.cep.toString());
    formData.append('estado', clienteData.estado);
    formData.append('cidade', clienteData.cidade);
    formData.append('endereco', clienteData.endereco);

    await this.clienteService.updateCliente(idCliente, formData).subscribe((cliente) => {
      console.log(cliente);
    });
  }
}
