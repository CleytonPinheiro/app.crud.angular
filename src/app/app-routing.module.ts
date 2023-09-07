import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaClientesComponent } from './components/template/lista-clientes/lista-clientes.component';
import { NewClienteComponent } from './components/template/new-cliente/new-cliente.component';
import { EditClienteComponent } from './components/template/edit-cliente/edit-cliente.component';

const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'cliente/new', component: NewClienteComponent },
  { path: 'cliente/edit/:id', component: EditClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
