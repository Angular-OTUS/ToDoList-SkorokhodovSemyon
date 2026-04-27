import { inject, Injectable } from '@angular/core';
import { ToDoListStore } from 'src/app/store/to-do-list/to-do-list-store';
import { CreateToDoTask, ToDoTask } from 'src/app/models/to-do-task';
import { ApiService } from 'src/app/services/api/api-service';
import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { ToastService } from 'src/app/services/toast/toast-service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Сервис для работы с тасками
 */
@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  //region Injected services

  /**
   * Сервис для работы с i18n
   */
  private readonly translate = inject(TranslateService);

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

    if (this.store.tasks.length > 0) {

      return of(this.store.tasks);
    }

    this.store.isLoading = true;

    return this.apiService.getAllTasks().pipe(
      tap(tasks => this.store.tasks = tasks),
      catchError(error => {
        this.toastService.showToast(this.translate.instant('NOTIFICATION.LOAD_ERROR'), 'error');
        return throwError(() => error);
      }),
      finalize(() => this.store.isLoading = false)
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
        this.store.tasks = [...this.store.tasks, createdTask];
        this.toastService.showToast(this.translate.instant('NOTIFICATION.ADD_SUCCESS', { title: createdTask.title }), 'success');
      }),
      catchError(error => {
        this.toastService.showToast(this.translate.instant('NOTIFICATION.ADD_ERROR'), 'error');
        return throwError(() => error);
      }),
    );
  }

  /**
   * Возвращает список тасок
   */
  getTaskList(): Observable<ToDoTask[]> {

    return this.store.tasks$;
  }

  /**
   * Удаляет таску из хранилища по ее ID.
   *
   * @param id - Идентификатор таски для удаления.
   */
  deleteTask(id: string): Observable<void> {

    return this.apiService.deleteTask(id).pipe(
      tap(() => {
        this.store.tasks = this.store.tasks.filter(t => t.id !== id);
        this.toastService.showToast(this.translate.instant('NOTIFICATION.DELETE_SUCCESS'), 'success');
      }),
      catchError(error => {
        this.toastService.showToast(this.translate.instant('NOTIFICATION.DELETE_ERROR'), 'error');
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
        this.store.tasks = this.store.tasks.map(t => t.id === savedTask.id ? savedTask : t);
        this.toastService.showToast(this.translate.instant('NOTIFICATION.UPDATE_SUCCESS'), 'success');
      }),
      catchError(error => {
        this.toastService.showToast(this.translate.instant('NOTIFICATION.UPDATE_ERROR'), 'error');
        return throwError(() => error);
      }),
    );
  }

  /**
   * Возвращает сигнал загрузки для использования в компонентах
   */
  getIsLoading(): Observable<boolean> {

    return this.store.isLoading$;
  }

  //endregion

}
