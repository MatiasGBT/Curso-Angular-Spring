import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html'
})
export class PaginadorComponent implements OnInit {

  //Con input se indica que esta variable proviene del componente padre (clientes.component)
  @Input() paginador: any;
  paginas: number[];

  desde:number;
  hasta:number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes:SimpleChange): void {
    let paginadorActualizado = changes['paginador'];
    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator():void {
    if (this.paginador.totalPages>5) {
      this.desde = Math.min(Math.max(1, this.paginador.number-4), this.paginador.totalPages-5);
      this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number+4), 6);

      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice) => indice + 1);
    }
  }
}

