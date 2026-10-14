import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Icinepolis } from '../icinepolis';

const STORAGE_KEY = 'cinepolis_ventas';

@Component({
  selector: 'app-ver-registro',
  imports: [ReactiveFormsModule, DecimalPipe],
  styleUrl: './ver-registro.css',
  templateUrl: './ver-registro.html',
})
export class VerRegistro implements OnInit {
  ventas: Icinepolis[] = [];
  formEdicion!: FormGroup;
  ventaEditando: Icinepolis | null = null;
  mostrarModal = false;
  errorEdicion = '';

  ngOnInit(): void {
    this.cargarVentas();
    this.formEdicion = new FormGroup({
      nombre: new FormControl(''), // ← único campo editable
    });
  }

  // ==================== READ ====================
  cargarVentas(): void {
    const data = localStorage.getItem(STORAGE_KEY);
    this.ventas = data ? JSON.parse(data) : [];
  }

  guardarEnStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ventas));
  }

  get totalTransacciones(): number {
    return this.ventas.length;
  }

  get totalIngresos(): number {
    return this.ventas.reduce((sum, v) => sum + v.valorPagar, 0);
  }

  // ==================== UPDATE (solo nombre) ====================
  abrirEdicion(venta: Icinepolis): void {
    this.ventaEditando = { ...venta };
    this.errorEdicion = '';
    this.formEdicion.patchValue({
      nombre: venta.nombre, // ← solo cargamos el nombre
    });
    this.mostrarModal = true;
  }

  guardarEdicion(): void {
    if (!this.ventaEditando) return;
    this.errorEdicion = '';

    const nombre = (this.formEdicion.value.nombre ?? '').trim();

    // Validación del único campo editable
    if (!nombre) {
      this.errorEdicion = 'El nombre es requerido.';
      return;
    }

    // Buscar la venta y actualizar SOLO el nombre
    const index = this.ventas.findIndex((v) => v.id === this.ventaEditando!.id);
    if (index !== -1) {
      this.ventas[index] = {
        ...this.ventas[index], // conserva todos los demás campos
        nombre, // sobreescribe solo el nombre
      };
      this.guardarEnStorage();
    }

    this.cerrarModal();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.ventaEditando = null;
    this.errorEdicion = '';
  }

  // ==================== DELETE ====================
  eliminar(id: number): void {
    if (!confirm('¿Seguro que quieres eliminar esta venta?')) return;
    this.ventas = this.ventas.filter((v) => v.id !== id);
    this.guardarEnStorage();
  }
}
