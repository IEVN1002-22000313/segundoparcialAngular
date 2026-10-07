import { Routes } from '@angular/router'; //aqui van las rutas de navegacion

export const routes: Routes = [
  {
    path: 'formularios',
    children: [
      {
        path: 'usuarios',
        loadComponent: () => import('./formularios/usuarios/usuarios').then((c) => c.Usuarios),
      },
      {
        path: 'zodiaco',
        loadComponent: () => import('./formularios/zodiaco/zodiaco').then((c) => c.Zodiaco),
      },
    ],
  },
  // ¡NUEVA RUTA PRINCIPAL PARA ESCUELA!
  {
    path: 'escuela', //se coloca desde la raiz no desde formularios, ya que es una ruta principal
    children: [
      {
        path: 'lista-alumnos', // Con guion, para que coincida con tu HTML
        loadComponent: () =>
          import('./escuela/lista-alumnos/lista-alumnos').then((c) => c.ListaAlumnos), //SE MANDA llamar como el nombre de la clase
      },
    ],
  },
  {
    path: '',
    redirectTo: 'formularios/zodiaco',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'formularios/zodiaco',
  },
];
