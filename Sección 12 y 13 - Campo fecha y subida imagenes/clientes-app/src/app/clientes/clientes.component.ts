import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(private clientesService: ClienteService,
    private activatedRout: ActivatedRoute,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe( params => {
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
    
    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
    });
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

  abrirModal(cliente:Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
