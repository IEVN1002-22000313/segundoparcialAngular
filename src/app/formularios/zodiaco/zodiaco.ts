import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-zodiaco",
  imports: [FormsModule],
  templateUrl: "./zodiaco.html",
  styleUrl: "./zodiaco.css",
})
export class Zodiaco {
  ///exportar la clase
  // Campos del formulario
  nombre: string = "";
  apaterno: string = "";
  amaterno: string = "";
  dia: number | null = null;
  mes: number | null = null;
  anioNacimiento: number | null = null;
  sexo: string = "";

  // Variables de resultado
  edad: number = 0;
  animalZodiaco: string = "";
  rutaImagen: string = "";
  mostrarResultado: boolean = false;

  // Método que se ejecuta cuando presiono imprimir
  calcularSigno() {
    // Validar que los campos obligatorios tengan datos
    if (!this.anioNacimiento || !this.dia || !this.mes || !this.nombre) return;

    // 1. Cálculo de la edad basado en el año actual 2026
    const anioActual = 2026;
    const mesActual = 10; // Septiembre
    const diaActual = 2; // 30

    let calculoEdad = anioActual - this.anioNacimiento;
    if (
      this.mes > mesActual ||
      (this.mes === mesActual && this.dia > diaActual)
    ) {
      calculoEdad--;
    }
    this.edad = calculoEdad;

    // 2. Arreglo de signos del zodiaco chino verificare posicioes
    const signos = [
      { nombre: "mono", archivo: "mono.jpeg" },
      { nombre: "gallo", archivo: "gallo.jpeg" },
      { nombre: "perro", archivo: "perro.jpeg" },
      { nombre: "cerdo", archivo: "cerdo.jpeg" },
      { nombre: "rata", archivo: "rata.jpeg" },
      { nombre: "buey", archivo: "buey.jpeg" },
      { nombre: "tigre", archivo: "tigre.jpeg" },
      { nombre: "conejo", archivo: "conejo.jpeg" },
      { nombre: "dragón", archivo: "dragon.jpeg" },
      { nombre: "serpiente", archivo: "serpiente.jpeg" },
      { nombre: "caballo", archivo: "caballo.jpeg" },
      { nombre: "cabra", archivo: "cabra.jpeg" },
    ];

    // 3. Operación matemática por residuo divido el año entre 12 y su residuo me da la posicion
    //del animal que corresponde
    const residuo = this.anioNacimiento % 12;
    this.animalZodiaco = signos[residuo].nombre;
    this.rutaImagen = `/imagenes/${signos[residuo].archivo}`;

    // 4. Activamos la vista del resultado
    this.mostrarResultado = true;
  }

  // Método para volver al formulario
  regresarFormulario() {
    this.mostrarResultado = false;
  }
}
