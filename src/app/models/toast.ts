/**
 * Модель для Toast уведомления
 */
export interface ToastMessage {
  //region Fields

  /**
   * Уникальный идентификатор уведомления
   */
  id: string;

  /**
   * Текст уведомления
   */
  message: string;

  /**
   * Тип уведомления
   */
  type?: 'success' | 'error' | 'info' | 'warning';

  //endregion
}
