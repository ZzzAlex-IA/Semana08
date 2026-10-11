import { MatButtonModule } from '@angular/material/button';






import { Component, computed, input, output } from '@angular/core';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Producto } from '../../models/producto';
import { Resaltar } from '../../directives/resaltar';
@Component({

selector: 'app-producto-card',
imports: [NgClass, CurrencyPipe, Resaltar, MatButtonModule],
templateUrl: './producto-card.html',
styleUrl: './producto-card.scss',
})
export class ProductoCard {
// Padre → hijo: producto a mostrar y si está seleccionado
readonly producto = input.required<Producto>();
readonly seleccionado = input(false);
// Hijo → padre: evento que avisa qué producto se eligió
readonly seleccionar = output<Producto>();
// computed(): valores derivados que se recalculan cuando cambia el producto
readonly stockBajo = computed(() => this.producto().estadoStock === 'INSUFICIENTE');
readonly porcentajeStock = computed(() => Math.min(this.producto().stock * 5, 100));
alSeleccionar(): void {
this.seleccionar.emit(this.producto());
}
}