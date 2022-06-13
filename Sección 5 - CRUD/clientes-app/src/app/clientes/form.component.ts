import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public titulo: string = "Crear cliente";
  public cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  private cargarCliente(): void {
    this.activatedRout.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        );
      }
    }
    )
  }

  public create():void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente guardado', `El cliente ${cliente.nombre} se ha guardado con éxito`, 'success')
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente actualizado', `El cliente ${cliente.nombre} se ha actualizado con éxito`, 'success')
      }
    )
  }

}
