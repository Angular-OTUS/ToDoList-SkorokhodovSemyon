import { Injectable, OnDestroy } from '@angular/core';
import { ToastMessage } from 'src/app/models/toast';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

/**
 * Сервис для уведомлений
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService implements OnDestroy {
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

  /**
   * Хранилище подписок на таймеры для каждого уведомления
   */
  private readonly timerSubscriptions = new Map<string, Subscription>();

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

    const subscription = timer(this.toastDuration).subscribe(() => {
      this.removeToast(id);
    });

    this.timerSubscriptions.set(id, subscription);
  }

  /**
   * Удаляет Toast уведомление по ID
   *
   * @param id идентификатор уведомления
   */
  removeToast(id: string): void {

    const filteredToasts = this._toasts.getValue().filter(toast => toast.id !== id);
    this._toasts.next(filteredToasts);

    if (this.timerSubscriptions.has(id)) {

      this.timerSubscriptions.get(id)?.unsubscribe();
      this.timerSubscriptions.delete(id);
    }
  }

  //endregion
  //region Hooks

  /**
   * Очищаем все таймеры при уничтожении сервиса
   */
  ngOnDestroy(): void {
    this.timerSubscriptions.forEach(sub => sub.unsubscribe());
    this.timerSubscriptions.clear();
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
