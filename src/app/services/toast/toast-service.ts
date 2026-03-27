import { Injectable } from '@angular/core';
import { ToastMessage } from 'src/app/models/toast';
import { BehaviorSubject, timer } from 'rxjs';

/**
 * Сервис для уведомлений
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  //region Fields

  /**
   * Массив активных Toast уведомлений
   */
  private readonly _toasts = new BehaviorSubject<ToastMessage[]>([]);

  /**
   * Длительность показа уведомления (5 секунд)
   */
  private readonly toastDuration = 5000;

  /**
   * Счетчик для генерации уникальных ID
   */
  private idCounter = 0;

  /**
   * Публичный список уведомлений
   */
  public readonly toasts$ = this._toasts.asObservable();

  //endregion
  //region Public

  /**
   * Показывает новое Toast уведомление
   *
   * @param message текст уведомления
   * @param type тип уведомления
   */
  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success'): void {

    const id = this.generateId();
    const newToast: ToastMessage = {
      id,
      message,
      type,
    };

    const currentToasts = this._toasts.getValue();
    this._toasts.next([...currentToasts, newToast]);

    timer(this.toastDuration).subscribe(() => {
      this.removeToast(id);
    });
  }

  /**
   * Удаляет Toast уведомление по ID
   *
   * @param id идентификатор уведомления
   */
  removeToast(id: string): void {

    const filteredToasts = this._toasts.getValue().filter(toast => toast.id !== id);
    this._toasts.next(filteredToasts);
  }

  //endregion
  //region Private

  /**
   * Генерирует уникальный идентификатор
   */
  private generateId(): string {

    return `toast-${Date.now()}-${this.idCounter++}`;
  }

  //endregion
}
