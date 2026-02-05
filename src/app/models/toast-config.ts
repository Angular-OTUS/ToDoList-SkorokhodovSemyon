/**
 * Типы уведомлений
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Конфигурация уведомления
 */
export interface ToastConfig {
  //region Fields

  /**
   * Сообщение
   */
  message: string;

  /**
   * Тип сообщения
   */
  type?: ToastType;

  /**
   * Длительность отображения
   */
  duration?: number;

  /**
   * Действие
   */
  action?: string;

  //endregion
}
