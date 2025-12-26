import { Injectable, signal } from '@angular/core';
import { ToDoTask } from 'src/app/models/to-do-task'

/**
 * Хранилище состояния списка тасок
 * Пока без хранения в localStorage и тд
 */
@Injectable({
  providedIn: 'root',
})
export class ToDoListStore {
  //region Fields

  /**
   * Список тасок
   */
  tasks = signal<ToDoTask[]>([]);

  //endregion
}
