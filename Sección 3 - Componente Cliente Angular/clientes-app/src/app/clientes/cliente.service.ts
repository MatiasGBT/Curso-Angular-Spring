import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  //Utilizar observables (programación reactiva y asíncrona) no es necesario con
  //información estática, sin embargo, estamos preparando la aplicación para
  //cuando obtengamos la información mediante una petición HTTP a una API REST
  getClientes(): Observable<Cliente[]> {
    //Con el of convertimos el método en un Observable, en un Stream (flujo de datos)
    return of(CLIENTES);
  }
}
