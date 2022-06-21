import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]
  paginador: any;

  constructor(private clientesService: ClienteService, private activatedRout: ActivatedRoute) { }

  //Hay que agregar un Observable para que vigile cuando cambia el parametro de página
  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe( params => {
      //El parametro page devuelve un String por lo que hay que convertirlo a number con el signo +
      let page = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clientesService.getClientes(page).subscribe(
         response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
         } 
      );
    })
    
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ms-1',
        cancelButton: 'btn btn-danger me-2'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro/a?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Cliente eliminado',
              `El cliente ${cliente.nombre} ha sido eliminado`,
              'success'
            )
          }
        );
      }
    })
  }

}
