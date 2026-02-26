import { inject, Injectable, Signal } from '@angular/core';
import { ToDoListStore } from 'src/app/store/to-do-list/to-do-list-store';
import { CreateToDoTask, ToDoTask } from 'src/app/models/to-do-task';
import { ApiService } from 'src/app/services/api/api-service';
import { finalize } from 'rxjs';

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

  /**
   * Сервис для работы с Апи
   */
  private readonly apiService = inject(ApiService);

  //endregion
  //region Public

  /**
   * Загружает таски из БД
   */
  loadTasks(): void {

    this.store.isLoading.set(true);

    this.apiService.getAllTasks()
      .pipe(
        finalize(() => this.store.isLoading.set(false))
      )
      .subscribe(tasks => {
        this.store.tasks.set(tasks);
      });
  }

  /**
   * Добавляет новую таску в хранилище.
   *
   * @param task - Новая таска.
   */
  addTask(task: CreateToDoTask): void {

    const newTask: ToDoTask = {
      ...task,
      id: Date.now().toString(),
      status: task.status || 'InProgress',
    }

    this.apiService.createTask(newTask).subscribe(createdTask => {
      this.store.tasks.update(current => [...current, createdTask]);
    });
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

    this.apiService.deleteTask(id).subscribe(() => {
      this.store.tasks.update(current => current.filter(t => t.id !== id));
    });
  }

  /**
   * Обновляет задачу
   *
   * @param updatedTask обновленная задача
   */
  updateTask(updatedTask: ToDoTask): void {

    this.apiService.updateTask(updatedTask).subscribe(savedTask => {
      this.store.tasks.update(current =>
        current.map(t => t.id === savedTask.id ? savedTask : t)
      );
    });
  }

  /**
   * Возвращает сигнал загрузки для использования в компонентах
   */
  getIsLoading(): Signal<boolean> {

    return this.store.isLoading.asReadonly();
  }

  //endregion

}
