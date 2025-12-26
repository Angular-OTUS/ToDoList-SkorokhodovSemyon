import { Component } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list/to-do-list-service';
import { FormsModule } from '@angular/forms';

/**
 * Компонент для отображения списка тасок и управления ими
 */
@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
})
export class ToDoList {
  //region Fields

  /**
   * Поле для хранения названия новой таски из Input
   */
  public newTaskTitle = '';

  /**
   * Список тасок
   */
  public taskList;

  //endregion
  //region Ctor

  /**
   * Конструктор
   *
   * @param toDoListService - сервис для работы с тасками
   */
  constructor(
    private toDoListService: ToDoListService,
  ) {

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
