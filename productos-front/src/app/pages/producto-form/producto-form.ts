import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.html'
})
export class ProductoForm implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productoService = inject(ProductoService);

  id?: number;
  editando = false;
  mensaje = '';

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    const valor = this.route.snapshot.paramMap.get('id');
    if (valor) {
      this.id = Number(valor);
      this.editando = true;
      this.productoService.buscarPorId(this.id).subscribe({
        next: p => this.form.patchValue({
          nombre: p.nombre,
          precio: p.precio,
          stock: p.stock
        }),
        error: err => this.mensaje = `Error HTTP: ${err.status}`
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const producto = this.form.getRawValue();
    const peticion = this.editando && this.id
      ? this.productoService.actualizar(this.id, producto)
      : this.productoService.registrar(producto);

    peticion.subscribe({
      next: () => this.router.navigate(['/productos']),
      error: err => this.mensaje = `Error HTTP: ${err.status}`
    });
  }
}