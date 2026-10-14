import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Icinepolis } from '../icinepolis';

const PRECIO_BOLETO = 12000;
const MAX_BOLETOS_POR_PERSONA = 7;
const STORAGE_KEY = 'cinepolis_ventas';

@Component({
  selector: 'app-cinepolis',
  imports: [ReactiveFormsModule, DecimalPipe],
  styleUrl: './cinepolis.css',
  templateUrl: './cinepolis.html',
})
export class Cinepolis implements OnInit {
  formulario!: FormGroup;

  nuevoUsuario: Icinepolis = {
    id: 0,
    nombre: '',
    cantidadCompradores: 0,
    tarjetaCineco: false,
    cantidadBoletos: 0,
    subtotal: 0,
    descuentoBoletos: 0,
    descuentoCineco: 0,
    valorPagar: 0,
  };

  error: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(''),
      tarjetaCineco: new FormControl('no'),
      cantidadBoletos: new FormControl(''),
    });
  }

  /** Lee el array actual de localStorage (o array vacío si no existe) */
  private leerVentas(): Icinepolis[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /** Agrega UNA venta al array guardado en localStorage */
  private agregarVenta(venta: Icinepolis): void {
    const ventas = this.leerVentas();
    ventas.push(venta);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ventas));
  }

  procesar(): void {
    this.error = '';

    const nombre = (this.formulario.value.nombre ?? '').trim();
    const cantidadCompradores = Number(this.formulario.value.cantidadCompradores);
    const cantidadBoletos = Number(this.formulario.value.cantidadBoletos);
    const tarjetaCineco = this.formulario.value.tarjetaCineco === 'si';

    // Validaciones
    if (!nombre) {
      this.error = 'Ingresa el nombre del comprador.';
      return;
    }
    if (!cantidadCompradores || cantidadCompradores < 1) {
      this.error = 'Ingresa una cantidad de compradores válida.';
      return;
    }
    if (!cantidadBoletos || cantidadBoletos < 1) {
      this.error = 'Ingresa una cantidad de boletos válida.';
      return;
    }

    const maxBoletos = cantidadCompradores * MAX_BOLETOS_POR_PERSONA;
    if (cantidadBoletos > maxBoletos) {
      this.error = `Máximo ${maxBoletos} boletos para ${cantidadCompradores} comprador(es).`;
      return;
    }

    // Cálculos
    const subtotal = cantidadBoletos * PRECIO_BOLETO;

    let porcentajeDescuento = 0;
    if (cantidadBoletos > 5) {
      porcentajeDescuento = 0.15;
    } else if (cantidadBoletos >= 3) {
      porcentajeDescuento = 0.1;
    }

    const descuentoBoletos = subtotal * porcentajeDescuento;
    const parcial = subtotal - descuentoBoletos;
    const descuentoCineco = tarjetaCineco ? parcial * 0.1 : 0;
    const valorPagar = parcial - descuentoCineco;

    // Construir la venta con id único
    const venta: Icinepolis = {
      id: Date.now(),
      nombre,
      cantidadCompradores,
      tarjetaCineco,
      cantidadBoletos,
      subtotal,
      descuentoBoletos,
      descuentoCineco,
      valorPagar,
    };

    // Guardar en localStorage
    this.agregarVenta(venta);

    // Mostrar en pantalla (solo el resumen individual)
    this.nuevoUsuario = venta;

    // Limpiar formulario
    this.formulario.reset({
      nombre: '',
      cantidadCompradores: '',
      tarjetaCineco: 'no',
      cantidadBoletos: '',
    });
  }

  verVentas(): void {
    this.router.navigate(['/escuela', 'ver-registro']);
  }
}
