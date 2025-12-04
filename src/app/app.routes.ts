import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('@app/home/home'),
  },
  {
    path: 'complex-form',
    loadComponent: () => import('@app/complex-form/complex-form'),
  },
];
