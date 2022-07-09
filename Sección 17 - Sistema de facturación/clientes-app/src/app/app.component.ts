import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  curso:string = 'Curso Spring con Angular';
  profesor:string = 'Andrés Guzmán';
}
