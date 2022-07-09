import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor, inicie sesión";
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      Swal.fire('Login', `${this.authService.usuario.nombre} ya estas autenticado`, 'info');
      this.router.navigate(['/clientes'])
    }
  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error login', 'Username o password vacíos', 'error')
    }
    this.authService.login(this.usuario).subscribe({
      next: response => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario; //Llama al getter
        this.router.navigate(['/clientes']);
        Swal.fire('Login', `${usuario.nombre} has iniciado sesión con éxito!`, 'success');
      },
      error: err => {
        if (err.status == 400) {
          Swal.fire('Error login', `Usuario o clave incorrectas`, 'error');
        }
      }
    });
  }

}
