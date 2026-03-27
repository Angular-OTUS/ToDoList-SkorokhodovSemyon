import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list/to-do-list-service';
import { ToDoTask } from 'src/app/models/to-do-task';
import { ToDoListItem } from 'src/app/components/to-do-list-item/to-do-list-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Spinner } from 'src/app/components/spinner/spinner';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [ToDoListItem, Spinner, AsyncPipe],
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
   * Идет ли загрузка данных
   */
  public isLoading$: Observable<boolean> = this.toDoListService.getIsLoading();

  /**
   * Список тасок
   */
  public taskList$: Observable<ToDoTask[]> = this.toDoListService.getTaskList();

  /**
   * Ссылка на контекст уничтожения компонента для отписок
   */
  private readonly destroyRef = inject(DestroyRef);

  /**
   * Задачи в процессе
   */
  readonly inProgressTasks$: Observable<ToDoTask[]> = this.taskList$.pipe(
    map(tasks => tasks.filter(t => t.status === 'InProgress'))
  );

  /**
   * Выполненные задачи
   */
  readonly completedTasks$: Observable<ToDoTask[]> = this.taskList$.pipe(
    map(tasks => tasks.filter(t => t.status === 'Completed'))
  );

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
