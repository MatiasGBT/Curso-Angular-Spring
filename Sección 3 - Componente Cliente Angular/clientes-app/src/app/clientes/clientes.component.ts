import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]

  //Para usar la clase service hay que inyectarla, esto se hace en el constructor
  constructor(private clientesService: ClienteService) { }

  //onInit es un evento que se inicia cuando inicia el componente
  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(
      clientes => this.clientes = clientes
      /*
      Esto de arriba es lo mismo que hacer:
      function(clientes) {
        this.clientes = clientes
      }
      Usamos llaves cuando requiere más de una línea y paréntesis cuando pasamos más de un argumento
      */
    );
  }

}
