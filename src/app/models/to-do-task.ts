/**
 * Возможные статусы задачи
 */
export type TaskStatus = 'InProgress' | 'Completed';

/**
 * Интерфейс, описывающий модель таски
 */
export interface ToDoTask {
  //region Public

  /**
   * Идентификатор таски
   */
  readonly id: string;

  /**
   * Название таски
   */
  readonly title: string;

  /**
   * Описание задачи
   */
  readonly description: string;

  /**
   * Статус задачи
   */
  readonly status: TaskStatus;

  //endregion
}

/**
 * Тип для создания новой задачи (id отсутствует, статус необязателен)
 */
export type CreateToDoTask = Omit<ToDoTask, 'id' | 'status'> & {

  readonly status?: TaskStatus;
};
