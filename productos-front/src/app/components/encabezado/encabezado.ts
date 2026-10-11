import { Component, input } from '@angular/core';
@Component({
selector: 'app-encabezado',
templateUrl: './encabezado.html',
styleUrl: './encabezado.scss',
})
export class Encabezado {
// input(): datos que llegan desde el componente padre (padre → hijo)
readonly titulo = input.required<string>();
readonly totalProductos = input(0);
}