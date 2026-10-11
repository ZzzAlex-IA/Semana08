import { Component, OnInit, signal } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto';
import { RouterLink } from '@angular/router'; // <-- NUEVO: Para que funcione el botón Editar

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink], // <-- NUEVO: Agregamos RouterLink aquí
  templateUrl: './catalogo.html'
})
export class Catalogo implements OnInit {
  productos = signal<Producto[]>([]);
  cargando = signal(false);
  error = signal('');

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando.set(true);
    this.error.set('');
    this.productoService.listar().subscribe({
      next: datos => {
        this.productos.set(datos);
        this.cargando.set(false);
      },
      error: err => {
        this.error.set(`Error HTTP: ${err.status}`);
        this.cargando.set(false);
      }
    });
  }

  // <-- NUEVO: Método para eliminar (Paso 12)
  eliminar(id: number | undefined): void {
    if (!id) return;
    if (!confirm('¿Eliminar producto?')) return;
    
    this.productoService.eliminar(id).subscribe({
      next: () => this.cargarProductos(),
      error: err => this.error.set(`Error HTTP: ${err.status}`)
    });
  }
}