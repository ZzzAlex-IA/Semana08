import { Directive, ElementRef, inject, input } from '@angular/core';
// Directiva de atributo propia: cambia el fondo del elemento al pasar el mouse
@Directive({
selector: '[appResaltar]',
// host: escucha eventos del elemento donde se aplica la directiva
host: {
'(mouseenter)': 'cambiarFondo(true)',
'(mouseleave)': 'cambiarFondo(false)',
},
})
export class Resaltar {
private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef);
// Color opcional: <div appResaltar="#e7f1ff">
// Si el atributo viene vacío se usa el color por defecto
readonly color = input('', { alias: 'appResaltar' });
cambiarFondo(activo: boolean): void {
const colorFinal = this.color() || '#fff8e1';
this.elemento.nativeElement.style.backgroundColor = activo ? colorFinal : '';
}
}