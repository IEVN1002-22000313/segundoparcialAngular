import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; //esto esta pendiente de revisar
import { FormsModule } from '@angular/forms'; //esto tambien esta pendiente de revisar

interface Alumno {
  matricula: string;
  nombre: string;
  correo: string;
  materia: string;
}

@Component({
  imports: [CommonModule, FormsModule], //verificar si esto es correcto
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos {
  nuevoAlumno: Alumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: '',
  };

  // Arreglo vacío listo para recibir datos
  alumnos: Alumno[] = [];

  agregarAlumno() {
    if (
      this.nuevoAlumno.matricula &&
      this.nuevoAlumno.nombre &&
      this.nuevoAlumno.correo &&
      this.nuevoAlumno.materia
    ) {
      this.alumnos.push({ ...this.nuevoAlumno });
      // Limpiar el formulario
      this.nuevoAlumno = { matricula: '', nombre: '', correo: '', materia: '' };
    }
  }
}
