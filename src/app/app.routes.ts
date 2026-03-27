import { Routes } from '@angular/router';
import { ToDoList } from 'src/app/components/to-do-list/to-do-list';
import { ToDoItemView } from 'src/app/components/to-do-item-view/to-do-item-view';

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
    component: ToDoList,
    children: [
      {
        path: ':id',
        component: ToDoItemView,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
