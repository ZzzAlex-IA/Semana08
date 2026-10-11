import { Component } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';
import { Catalogo } from './components/catalogo/catalogo';
@Component({
selector: 'app-root',
// Componentes que esta plantilla puede usar
imports: [Encabezado, Catalogo],
templateUrl: './app.html',
styleUrl: './app.scss',
})
export class App {

}