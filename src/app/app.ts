/*import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar], // Solo RouterOutlet y Navbar. ¡No metas Zodiaco ni Usuarios aquí!
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  title = 'segundoparcialAngular';

  ngOnInit(): void {
    initFlowbite();
  }
}
*/

import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterOutlet], //solo se importa la  barra de navegacion y el routeroutlet, no se importa zodiaco ni usuarios
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements AfterViewInit {
  title = 'segundoparcialAngular';

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
