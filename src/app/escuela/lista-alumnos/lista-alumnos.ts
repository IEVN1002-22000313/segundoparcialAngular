import { Component, OnInit } from '@angular/core';
import { IAlumno } from '../alumnos'; // Asegúrate de que la ruta sea correcta
//import { CommonModule } from '@angular/common'; //esto esta pendiente de revisar
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'; //esto tambien esta pendiente de revisar

@Component({
  imports: [FormsModule, ReactiveFormsModule], //verificar si esto es correcto
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos implements OnInit {
  formulario!: FormGroup;

  alumnos: IAlumno[] = [];
  nuevoAlumno: IAlumno = {
    matricula: 'xx',
    nombre: 'xx',
    correo: 'xx',
    materia: 'xx',
  };

  ngOnInit(): void {
    this.cargarAlumno();
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });
  }

  muestraAlumnos(): void {
    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;
  }

  cargarAlumno() {}
}
