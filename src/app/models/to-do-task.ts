/**
 * Интерфейс, описывающий модель таски
 */
export interface ToDoTask {
  //region Public

  /**
   * Идентификатор таски
   */
  readonly id?: string;

  /**
   * Название таски
   */
  readonly title: string;

  /**
   * Описание задачи
   */
  readonly description: string;

  //endregion
}
