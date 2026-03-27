import { Injectable } from '@angular/core';
import { ToDoTask } from 'src/app/models/to-do-task';
import { BehaviorSubject } from 'rxjs';

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
   * Приватный источник данных для списка задач.
   */
  private readonly _tasks = new BehaviorSubject<ToDoTask[]>([]);
  /**
   * Публичный Observable поток списка задач.
   * Используется для подписки на изменения в компонентах (например, через async pipe).
   */
  public readonly tasks$ = this._tasks.asObservable();
  /**
   * Приватный источник данных для состояния загрузки.
   */
  private readonly _isLoading = new BehaviorSubject<boolean>(false);
  /**
   * Публичный Observable поток состояния загрузки.
   * Используется для подписки на изменения в компонентах.
   */
  public readonly isLoading$ = this._isLoading.asObservable();

  //endregion
  //region Getters and Setters

  /**
   * Возвращает текущее значение списка задач.
   *
   * @returns массив текущих задач.
   */
  get tasks(): ToDoTask[] {

    return this._tasks.getValue();
  }

  /**
   * Обновляет список задач и автоматически уведомляет всех подписчиков потока tasks$.
   *
   * @param value новый массив задач.
   */
  set tasks(value: ToDoTask[]) {

    this._tasks.next(value);
  }

  /**
   * Возвращает текущее состояние загрузки.
   *
   * @returns true, если идет загрузка, иначе false.
   */
  get isLoading(): boolean {

    return this._isLoading.getValue();
  }

  /**
   * Обновляет состояние загрузки и автоматически уведомляет всех подписчиков потока isLoading$.
   *
   * @param value новое состояние загрузки.
   */
  set isLoading(value: boolean) {

    this._isLoading.next(value);
  }

  //endregion
}
