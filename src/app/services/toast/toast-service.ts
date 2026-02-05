import { Injectable, signal } from '@angular/core';
import { ToastMessage } from 'src/app/models/toast';

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
  private readonly toasts = signal<ToastMessage[]>([]);

  /**
   * Длительность показа уведомления (5 секунд)
   */
  private readonly toastDuration = 5000;

  /**
   * Счетчик для генерации уникальных ID
   */
  private idCounter = 0;

  //endregion
  //region Public

  /**
   * Возвращает массив активных уведомлений
   */
  getToasts() {

    return this.toasts.asReadonly();
  }

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

    this.toasts.update(toasts => [...toasts, newToast]);

    setTimeout(() => {
      this.removeToast(id);
    }, this.toastDuration);
  }

  /**
   * Удаляет Toast уведомление по ID
   *
   * @param id идентификатор уведомления
   */
  removeToast(id: string): void {

    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
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
