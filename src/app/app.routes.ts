import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'zip',
  },
  {
    path: 'zip',
    loadComponent: () => import('@app/modules/zip/zip.component').then((c) => c.ZipComponent),
  },
];
