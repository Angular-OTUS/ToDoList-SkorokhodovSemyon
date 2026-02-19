import { ChangeDetectionStrategy, Component, inject, output, viewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    ReactiveFormsModule,
  ],
  templateUrl: './create-to-do-item.html',
  styleUrl: './create-to-do-item.scss',
})
export class CreateToDoItem {
  //region Inject

  /**
   * Сервис для создания формы
   */
  private readonly fb = inject(FormBuilder);

  //endregion
  //region Fields

  /**
   * Форма для добавления таски
   */
  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  /**
   * Ссылка на инпут форму
   */
  readonly formDirective = viewChild.required(FormGroupDirective);

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

    if (this.form.invalid) {

      return;
    }

    const formValue = this.form.getRawValue();

    this.createTask.emit({
      title: formValue.title,
      description: formValue.description,
    });

    this.formDirective().resetForm();
    this.form.reset();
    this.form.markAsUntouched();
  }

  //endregion
}
