import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../../models/producto';
@Component({
selector: 'app-detalle-producto',
imports: [CurrencyPipe],
templateUrl: './detalle-producto.html',
styleUrl: './detalle-producto.scss',
})
export class DetalleProducto {
readonly producto = input.required<Producto>();
// Evento sin datos: solo avisa al padre que debe cerrar el panel
readonly cerrar = output<void>();
// Valor del inventario de este producto (precio × stock)
readonly valorInventario = computed(
() => this.producto().precio * this.producto().stock,
);
}