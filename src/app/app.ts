/*import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('segundoparcialAngular');
}
*/
/*
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
// 1. IMPORTANTE!!!  Importar el componente con la ruta correcta hasta el html (colocar sin extencion.html)
import { Zodiaco } from "./formularios/zodiaco/zodiaco";

@Component({
  selector: "app-root",
  // 2. IMPORTANTE!!! Agregar Zodiaco (clase) al arreglo de imports
  imports: [RouterOutlet, Zodiaco],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class AppComponent {
  title = "segundoparcialAngular";
}

//-----Esto es nuevo
import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { initFlowbite } from "flowbite";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "web-app";

  ngOnInit(): void {
    initFlowbite();
  }
}
*/
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Navbar } from './navbar/navbar'; //tenemos que importar el navbar aqui tambien
import { Usuarios } from './formularios/usuarios/usuarios';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Usuarios], //eferenciamos al nav
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  title = 'segundoparcialAngular';

  ngOnInit(): void {
    initFlowbite();
  }
}
