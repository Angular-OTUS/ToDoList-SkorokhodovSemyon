import { inject, Injectable, Signal } from '@angular/core';
import { ToDoListStore } from 'src/app/store/to-do-list/to-do-list-store';
import { CreateToDoTask, ToDoTask } from 'src/app/models/to-do-task';
import { ApiService } from 'src/app/services/api/api-service';
import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast-service';

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

  /**
   * Сервис для работы с уведомлениями
   */
  readonly toastService: ToastService = inject(ToastService);

  //endregion
  //region Public

  /**
   * Загружает таски из БД
   */
  loadTasks(): Observable<ToDoTask[]> {

    if (this.store.tasks().length > 0) {

      return of(this.store.tasks());
    }

    this.store.isLoading.set(true);

    return this.apiService.getAllTasks().pipe(
      tap(tasks => this.store.tasks.set(tasks)),
      catchError(error => {
        this.toastService.showToast('Ошибка при загрузке списка задач', 'error');
        return throwError(() => error);
      }),
      finalize(() => this.store.isLoading.set(false)),
    );
  }

  /**
   * Добавляет новую таску в хранилище.
   *
   * @param task - Новая таска.
   */
  addTask(task: CreateToDoTask): Observable<ToDoTask> {

    const newTask: ToDoTask = {
      ...task,
      id: Date.now().toString(),
      status: task.status || 'InProgress',
    }

    return this.apiService.createTask(newTask).pipe(
      tap(createdTask => {
        this.store.tasks.update(current => [...current, createdTask]);
        this.toastService.showToast(`Задача "${createdTask.title}" успешно добавлена`, 'success');
      }),
      catchError(error => {
        this.toastService.showToast('Ошибка при добавлении задачи', 'error');
        return throwError(() => error);
      }),
    );
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
  deleteTask(id: string): Observable<void> {

    return this.apiService.deleteTask(id).pipe(
      tap(() => {
        this.store.tasks.update(current => current.filter(t => t.id !== id));
        this.toastService.showToast('Задача успешно удалена', 'success');
      }),
      catchError(error => {
        this.toastService.showToast('Ошибка при удалении задачи', 'error');
        return throwError(() => error);
      }),
    );
  }

  /**
   * Обновляет задачу
   *
   * @param updatedTask обновленная задача
   */
  updateTask(updatedTask: ToDoTask): Observable<ToDoTask> {

    return this.apiService.updateTask(updatedTask).pipe(
      tap(savedTask => {
        this.store.tasks.update(current =>
          current.map(t => t.id === savedTask.id ? savedTask : t),
        );
        this.toastService.showToast('Задача обновлена', 'success');
      }),
      catchError(error => {
        this.toastService.showToast('Ошибка при обновлении задачи', 'error');
        return throwError(() => error);
      }),
    );
  }

  /**
   * Возвращает сигнал загрузки для использования в компонентах
   */
  getIsLoading(): Signal<boolean> {

    return this.store.isLoading.asReadonly();
  }

  //endregion

}
