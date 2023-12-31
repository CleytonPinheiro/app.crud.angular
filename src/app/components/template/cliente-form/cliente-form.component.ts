import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiIbgeServiceService } from 'src/app/services/api-ibge-service.service';
import { Cliente } from 'src/app/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})

export class ClienteFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Cliente>();
  @Input() btnText!: string;
  @Input() ufs!: {};
  @Input() ufSelected: string = '';
  @Input() citiesByUf!: {};
  @Input() clienteData: Cliente | null = null;

  clienteForm!: FormGroup;

  constructor(
    private apiIbgeService: ApiIbgeServiceService
  ) { }

  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      id: new FormControl(this.clienteData ? this.clienteData.id : ''),
      cpf: new FormControl(this.clienteData ? this.clienteData.cpf : '', [Validators.required]),
      nome: new FormControl(this.clienteData ? this.clienteData.nome : ''),
      dataNascimento: new FormControl(this.clienteData ? this.clienteData.data_nascimento : ''),
      sexo: new FormControl(this.clienteData ? this.clienteData.sexo : ''),
      cep: new FormControl(this.clienteData ? this.clienteData.cep : ''),
      estado: new FormControl(this.clienteData ? this.clienteData.estado : ''),
      cidade: new FormControl(this.clienteData ? this.clienteData.cidade : ''),
      endereco: new FormControl(this.clienteData ? this.clienteData.endereco : ''),
    });

    const valueInputUf = this.clienteForm.get('estado')?.value;

    if (valueInputUf != '') {
      this.ufSelected = valueInputUf;
      this.getCitiesByUf();
    }

    this.clienteForm.get('estado')?.valueChanges.subscribe((selectedValueUf: string) => {
      this.ufSelected = selectedValueUf;
      this.getCitiesByUf();
    });
  }

  getCitiesByUf() {
    this.apiIbgeService.getCitiesByUf(this.ufSelected).subscribe((data) => {
      this.citiesByUf = data;
    });
  }

  get id() {
    return this.clienteForm.get('id')!;
  }

  get cpf() {
    return this.clienteForm.get('cpf')!;
  }

  get nome() {
    return this.clienteForm.get('nome')!;
  }

  get endereco() {
    return this.clienteForm.get('endereco')!;
  }

  get dataNascimento() {
    return this.clienteForm.get('dataNascimento')!;
  }

  get sexo() {
    return this.clienteForm.get('sexo')!;
  }
  get cep() {
    return this.clienteForm.get('cep')!;
  }
  get estado() {
    return this.clienteForm.get('estado')!;
  }
  get cidade() {
    return this.clienteForm.get('cidade')!;
  }
  submit() {
    if (this.clienteForm.invalid) {
      console.log('Form invalido: ', this.clienteForm.errors);
      return;
    }
    this.onSubmit.emit(this.clienteForm.value);
  }
}
