import { Routes } from '@angular/router';

/**
 * Навигация приложения
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/to-do-list/to-do-list').then(m => m.ToDoList),
    children: [
      {
        path: ':id',

        loadComponent: () => import('./components/to-do-item-view/to-do-item-view').then(m => m.ToDoItemView)
      }
    ]
  },
  {
    path: 'board',
    loadComponent: () => import('./components/board/board').then(m => m.Board)
  },
  {
    path: '**',
    redirectTo: 'tasks',
  }
];
