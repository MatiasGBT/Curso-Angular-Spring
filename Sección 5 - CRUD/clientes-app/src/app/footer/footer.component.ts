import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  //any es para cualquier tipo, ya sea string, number, array, etc.
  autor: any = {nombre:'Andrés', apellido:'Guzmán'};

}
