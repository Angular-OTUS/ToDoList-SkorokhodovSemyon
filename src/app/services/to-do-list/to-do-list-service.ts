import { inject, Injectable, Signal } from '@angular/core';
import { ToDoListStore } from 'src/app/store/to-do-list/to-do-list-store';
import { ToDoTask } from 'src/app/models/to-do-task';

/**
 * Сервис для работы с тасками
 */
@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  //region Injected services

  /**
   * Хранилище
   */
  private readonly store = inject(ToDoListStore)

  //endregion
  //region Public

  /**
   * Добавляет новую таску в хранилище.
   *
   * @param task - Новая таска.
   */
  addTask(task: ToDoTask): void {

    const newTask: ToDoTask = {
      ...task,
      id: Date.now().toString(),
    }

    this.store.tasks.update(currentTasks => [...currentTasks, newTask]);
  }

  /**
   * Возвращает список тасок
   */
  getTaskList(): Signal<ToDoTask[]> {

    return this.store.tasks.asReadonly();
  }

  /**
   * Удаляет таску из хранилища по ее ID.
   *
   * @param id - Идентификатор таски для удаления.
   */
  deleteTask(id: string): void {

    this.store.tasks.update(currentTasks =>
      currentTasks.filter(task => task.id !== id),
    );
  }

  //endregion

}
