import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list/to-do-list-service';
import { ToDoTask } from 'src/app/models/to-do-task';
import { ToDoListItem } from 'src/app/components/to-do-list-item/to-do-list-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spinner } from 'src/app/components/spinner/spinner';

@Component({
  selector: 'app-board',
  imports: [ToDoListItem, Spinner],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board implements OnInit {
  //region Fields

  /**
   * Сервис для работы с тасками
   *
   * @private
   */
  private readonly toDoListService = inject(ToDoListService);

  /**
   * Ссылка на контекст уничтожения компонента для отписок
   */
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Задачи в процессе
   */
  readonly inProgressTasks = computed(() =>
    this.taskList().filter(t => t.status === 'InProgress')
  );

  /**
   * Выполненные задачи
   */
  readonly completedTasks = computed(() =>
    this.taskList().filter(t => t.status === 'Completed')
  );

  /**
   * Идет ли загрузка данных
   */
  public isLoading: Signal<boolean> = this.toDoListService.getIsLoading();

  /**
   * Список тасок
   */
  public taskList: Signal<ToDoTask[]> = this.toDoListService.getTaskList();

  //endregion
  //region Hooks

  ngOnInit() {

    this.toDoListService.loadTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  //endregion
  //region Handlers

  /**
   * Удаляет таску
   *
   * @param id - идентификатор задачи
   */
  removeTaskHandler(id: string) {

    this.toDoListService.deleteTask(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  /**
   * Обновляет таску
   *
   * @param updatedTask обновленной значение таски
   */
  updateTaskHandler(updatedTask: ToDoTask) {

    this.toDoListService.updateTask(updatedTask)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  //endregion
}
