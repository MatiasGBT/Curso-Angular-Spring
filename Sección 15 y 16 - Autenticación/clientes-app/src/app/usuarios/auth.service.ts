import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Se definen con _ debido a que tienen métodos getters/accesores
  //Esto se requiere debido a que se va a buscar en el SessionStorage
  private _usuario: Usuario;
  private _token: string;

  constructor(private http:HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('usuario');
      return this._token;
    }
    return null;
  }

  login(usuario:Usuario):Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    //btoa para encriptar en base 64
    const credenciales = window.btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  guardarUsuario(access_token:string): void {
    let payload = this.obtenerPayload(access_token);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    //sessionStorage pide de segundo parámetro un String, por lo que hay que enviar un JSON plano
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(access_token:string): void {
    this._token = access_token;
    sessionStorage.setItem('token', access_token);
  }

  private obtenerPayload(access_token:string): any {
    if (access_token != null) {
      return JSON.parse(window.atob(access_token.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerPayload(this.token);
    return payload != null && payload.user_name && payload.user_name.length>0;
  }

  hasRole(role:string): boolean {
    return this.usuario.roles.includes(role);
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}
