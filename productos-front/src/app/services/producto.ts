import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
@Injectable({
providedIn: 'root'
})
export class ProductoService {
private readonly apiUrl =
'https://glorious-spork-747q6qvw9g4hr5x7-8080.app.github.dev/api/productos';
constructor(private http: HttpClient) {}
listar(): Observable<Producto[]> {
return this.http.get<Producto[]>(this.apiUrl);
}
buscarPorId(id: number): Observable<Producto> {
return this.http.get<Producto>(`${this.apiUrl}/${id}`);
}
registrar(producto: Producto): Observable<Producto> {
return this.http.post<Producto>(this.apiUrl, producto);
}
actualizar(id: number, producto: Producto): Observable<Producto> {
return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
}
eliminar(id: number): Observable<void> {
return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}