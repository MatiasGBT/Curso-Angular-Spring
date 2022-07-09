import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ClienteService } from '../clientes/cliente.service';
import { Factura } from './models/factura';
import { ItemFactura } from './models/item-factura';
import { Producto } from './models/producto';
import { FacturaService } from './services/factura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo: string = 'Nueva factura';
  factura: Factura = new Factura();

  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      let id = +params.get('clienteId');
      this.clienteService.getCliente(id).subscribe(cliente => this.factura.cliente = cliente);
    });
    
    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      //Este map sirve para asegurarse de que devuelva un String y no un objeto Producto
      map(value => typeof value === 'string' ? value : value.nombre),

      //map(value => this._filter(value || ''))
      //map convierte un observable en datos comúnes como un array, no en otros observables
      //para eso hay que usar compactMap
      mergeMap(value => value ? this._filter(value) : [])
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    return this.facturaService.filtrarProductos(value);
  }

  //Con ? (producto?:Producto) se indica que quiza reciba un producto
  //este método puede retornar un string o un undefined
  mostrarNombre(producto?: Producto): string | undefined{
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent) {
    //Se recupera el producto seleccionado y se lo asigna al array de items de la factura:
    let producto = event.option.value as Producto;

      if (this.existeItem(producto.id)) {
        this.incrementarCantidad(producto.id);
      } else {
        let nuevoItem = new ItemFactura();
        nuevoItem.producto = producto;
        this.factura.items.push(nuevoItem);
      }

    //Se reinicia el valor del autocompletado:
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad = event.target.value as number;
    if (cantidad <= 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map(item => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach(item => {
      if (item.producto.id == id) {
        existe = true;
      }
      return item;
    });
    return existe;
  }

  incrementarCantidad(id: number): void {
    this.factura.items = this.factura.items.map(item => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter(item => id !== item.producto.id);
  }

  create(): void {
    this.facturaService.create(this.factura).subscribe(factura => {
      Swal.fire(this.titulo, `Factura ${factura.descripcion} creada con éxito`, 'success');
      this.router.navigate(['/clientes']);
    });
  }
}
