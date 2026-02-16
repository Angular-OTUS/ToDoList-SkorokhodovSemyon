import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list/to-do-list-service';
import { FormsModule } from '@angular/forms';
import { TaskStatus, ToDoTask } from 'src/app/models/to-do-task';
import { ToDoListItem } from 'src/app/components/to-do-list-item/to-do-list-item';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Button } from 'src/app/components/button/button';
import { TooltipDirective } from 'src/app/components/directives/tooltip.directive';
import { ToastService } from 'src/app/services/toast/toast-service';
import { Spinner } from 'src/app/components/spinner/spinner';
import { MatOption, MatSelect } from '@angular/material/select';

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
    Button,
    TooltipDirective,
    Spinner,
    MatSelect,
    MatOption,
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
   * Сервис для работы с уведомлениями
   */
  readonly toastService: ToastService = inject(ToastService);

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

  /**
   * Выбранный фильтр: null = ALL
   */
  readonly statusFilter = signal<TaskStatus | null>(null);

  /**
   * Отфильтрованный список для отображения
   */
  readonly filteredTaskList: Signal<ToDoTask[]> = computed(() => {

    const filter = this.statusFilter();
    const tasks = this.taskList();

    return filter === null ? tasks : tasks.filter(t => t.status === filter);
  });

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

    const title = this.newTaskTitle();

    this.toDoListService.addTask(
      {
        title: this.newTaskTitle(),
        description: this.newTaskDescription(),
      });
    this.newTaskTitle.set('');
    this.newTaskDescription.set('');
    this.toastService.showToast(`Задача "${title}" успешно добавлена`, 'success');
  }

  /**
   * Удаляет выбранную таску
   *
   * @param id идентификатор таски
   */
  removeTaskHandler(id: string) {

    const task = this.taskList().find(t => t.id === id);
    const taskTitle = task?.title || 'Задача';

    if (this.selectedTask()?.id === id) {

      this.selectedTask.set(null);
    }

    this.toDoListService.deleteTask(id);

    this.toastService.showToast(`Задача "${taskTitle}" успешно удалена`, 'success');
  }

  /**
   * Обработчик клика по выбранной таске
   *
   * @param task выбранная таска
   */
  selectTaskHandler(task: ToDoTask) {

    this.selectedTask.set(task);
  }

  /**
   * Обновляет задачу
   */
  updateTaskHandler(updatedTask: ToDoTask) {

    this.toDoListService.updateTask(updatedTask);
    this.toastService.showToast('Задача обновлена', 'success');
  }

  //endregion
}
