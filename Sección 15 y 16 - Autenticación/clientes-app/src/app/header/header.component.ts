import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  title:string = 'Angular - Spring';

  constructor(public authService:AuthService, private router: Router) {}

  logout(): void {
    Swal.fire('Logout', `${this.authService.usuario.username} has cerrado sesión con éxito`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
