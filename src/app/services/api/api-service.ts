import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoTask } from 'src/app/models/to-do-task';

/**
 * Сервис для работы с Апи
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //region Const

  /**
   * Урл БД
   */
  private readonly apiUrl = 'http://localhost:3000/tasks';

  //endregion
  //region Inject

  /**
   * Клиент для HTTP запросов
   */
  private readonly http = inject(HttpClient);

  //endregion
  //region Public

  /**
   * Загрузить все таски
   */
  getAllTasks(): Observable<ToDoTask[]> {

    return this.http.get<ToDoTask[]>(this.apiUrl);
  }

  /**
   * Создать таску
   */
  createTask(task: ToDoTask): Observable<ToDoTask> {

    return this.http.post<ToDoTask>(this.apiUrl, task);
  }

  /**
   * Обновить таску
   */
  updateTask(task: ToDoTask): Observable<ToDoTask> {

    return this.http.put<ToDoTask>(`${this.apiUrl}/${task.id}`, task);
  }

  /**
   * Удалить таску
   */
  deleteTask(id: string): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //endregion
}
