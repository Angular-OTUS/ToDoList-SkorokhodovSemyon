import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list/to-do-list-service';
import { FormsModule } from '@angular/forms';
import { ToDoTask } from 'src/app/models/to-do-task';
import { ToDoListItem } from 'src/app/components/to-do-list-item/to-do-list-item';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Button } from 'src/app/components/button/button';
import { TooltipDirective } from 'src/app/components/directives/tooltip.directive';

/**
 * Компонент для отображения списка тасок и управления ими
 */
@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItem,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinner,
    Button,
    TooltipDirective,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
  //region Fields

  /**
   * Сервис для работы с тасками
   */
  readonly toDoListService = inject(ToDoListService);

  /**
   * Поле для хранения названия новой таски из Input
   */
  readonly newTaskTitle = signal<string>('');

  /**
   * Поле для хранения описания новой таски из Input
   */
  readonly newTaskDescription = signal<string>('');

  /**
   * Происходит ли загрузка данных
   */
  readonly isLoading = signal<boolean>(true);

  /**
   * Список тасок
   */
  public taskList: Signal<ToDoTask[]> = this.toDoListService.getTaskList();

  /**
   * Выбранная таска для отображения описания
   */
  readonly selectedTask = signal<ToDoTask | null>(null);

  //endregion
  //region Hooks

  ngOnInit() {

    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  //endregion
  //region Handler

  /**
   * Добавляет новую таску
   */
  addTaskHandler() {

    if (!this.newTaskTitle().trim() || !this.newTaskDescription().trim()) {

      return;
    }

    this.toDoListService.addTask(
      {
        title: this.newTaskTitle(),
        description: this.newTaskDescription(),
      });
    this.newTaskTitle.set('');
    this.newTaskDescription.set('');
  }

  /**
   * Удаляет выбранную таску
   *
   * @param id идентификатор таски
   */
  removeTaskHandler(id: string) {

    if (this.selectedTask()?.id === id) {

      this.selectedTask.set(null);
    }

    this.toDoListService.deleteTask(id);
  }

  /**
   * Обработчик клика по выбранной таске
   *
   * @param task выбранная таска
   */
  selectTaskHandler(task: ToDoTask) {

    this.selectedTask.set(task);
  }

  //endregion
}
