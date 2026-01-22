import { ChangeDetectionStrategy, Component, inject, OnInit, signal, Signal } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list/to-do-list-service';
import { FormsModule } from '@angular/forms';
import { ToDoTask } from 'src/app/models/to-do-task';
import { ToDoListItem } from 'src/app/components/to-do-list-item/to-do-list-item';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoList implements OnInit {
  //region Fields

  /**
   * Поле для хранения названия новой таски из Input
   */
  public newTaskTitle: string = '';

  /**
   * Список тасок
   */
  public taskList: Signal<ToDoTask[]> = signal<ToDoTask[]>([]);

  /**
   * Сервис для работы с тасками
   */
  toDoListService = inject(ToDoListService);

  //endregion
  //region Hooks

  ngOnInit() {

    this.taskList = this.toDoListService.getTaskList();
  }

  //endregion
  //region Handler

  /**
   * Добавляет новую таску
   */
  addTaskHandler() {

    if (!this.newTaskTitle.trim()) {

      return;
    }

    this.toDoListService.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
  }

  /**
   * Удаляет выбранную таску
   *
   * @param id идентификатор таски
   */
  removeTaskHandler(id: string) {

    this.toDoListService.deleteTask(id)
  }

  //endregion
}
