import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public titulo: string = "Crear cliente";
  public cliente: Cliente = new Cliente();
  public regiones: Region[];
  public errores:string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones)
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
    this.clienteService.create(this.cliente).subscribe({
      next: (json) => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente guardado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
      },
      error: (err) => {
        this.errores = err.error.errores as string[];
        console.error("Código de error: " + err.status);
        console.error(err.error.errores);
      }
   });
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe({
      next: (json) => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
      },
      error: (err) => {
        this.errores = err.error.errores as string[];
        console.error("Código de error: " + err.status);
        console.error(err.error.errores);
      }
    })
  }

  //region1 corresponde a cada una de las regiones del ngFor,
  //region2 es la que esta asiganada al cliente
  compararRegion(region1: Region, region2: Region): boolean {
    if (region1 === undefined && region2 === undefined) {
      return true;
    }
    return region1 == null || region2 == null ? false : region1.id === region2.id;
  }
}
