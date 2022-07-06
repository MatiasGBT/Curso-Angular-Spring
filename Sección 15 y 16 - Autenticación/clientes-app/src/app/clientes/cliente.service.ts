import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  //Ya no es necesario este header debido a que por defecto lo utilizara
  //private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router:Router, private authService:AuthService) { }


  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page: number): Observable<any> {
    return this.http.get<Cliente[]>(this.urlEndPoint + `/page/${page}`).pipe(
      map((response:any) => {
        response.content as Cliente[];
        return response;
      })
    );
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente).pipe(
      catchError(e => {
        if (e.status==400) {
          return throwError(()=>e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(()=>e);
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        if (e.status==400) {
          return throwError(()=>e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(()=>e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(()=>e);
      })
    );
  }

  subirFoto(archivo: File, id):Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      catchError(e => {
        return throwError(()=>e);
      })
    );
  }
}
