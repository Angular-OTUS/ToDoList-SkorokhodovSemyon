import { Routes } from '@angular/router';
import { ToDoList } from 'src/app/components/to-do-list/to-do-list';
import { ToDoItemView } from 'src/app/components/to-do-item-view/to-do-item-view';
import { Board } from 'src/app/components/board/board';

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
    path: 'board',
    component: Board,
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
