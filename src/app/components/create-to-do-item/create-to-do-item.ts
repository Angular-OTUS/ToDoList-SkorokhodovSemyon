import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Button } from 'src/app/components/button/button';
import { TooltipDirective } from 'src/app/components/directives/tooltip.directive';
import { ToDoTask } from 'src/app/models/to-do-task';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-to-do-item',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    Button,
    TooltipDirective,
  ],
  templateUrl: './create-to-do-item.html',
  styleUrl: './create-to-do-item.scss',
})
export class CreateToDoItem {
  //region Fields

  /**
   * Поле для хранения названия новой таски из Input
   */
  readonly newTaskTitle = signal<string>('');

  /**
   * Поле для хранения описания новой таски из Input
   */
  readonly newTaskDescription = signal<string>('');

  //endregion
  //region Output

  /**
   * Созданная таска
   */
  createTask = output<ToDoTask>();

  //endregion
  //region Handler

  /**
   * Обработчик нажатия кнопки добавить
   */
  addTaskHandler() {

    if (!this.newTaskTitle().trim() || !this.newTaskDescription().trim()) {

      return;
    }

    this.createTask.emit({
      title: this.newTaskTitle(),
      description: this.newTaskDescription(),
    });

    this.newTaskTitle.set('');
    this.newTaskDescription.set('');
  }

  //endregion
}
