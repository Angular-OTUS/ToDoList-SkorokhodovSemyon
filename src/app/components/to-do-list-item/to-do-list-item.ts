import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  output,
  signal, viewChild,
  ViewChild
} from '@angular/core';
import { ToDoTask } from 'src/app/models/to-do-task';
import { Button } from 'src/app/components/button/button';
import { TooltipDirective } from 'src/app/components/directives/tooltip.directive';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

/**
 * Компонент позиции в списке
 */
@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  imports: [
    Button,
    TooltipDirective,
    MatFormField,
    MatInput,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
  //region Fields

  /**
   * Ссылка на инпут элемент
   */
  readonly titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');

  /**
   * Режим редактирования
   */
  readonly isEditing = signal<boolean>(false);

  /**
   * Новое название задачи при редактировании
   */
  readonly editedTitle = signal<string>('');

  //endregion
  //region Input

  /**
   * Данные о задаче, которые приходят от родительского компонента.
   */
  readonly item = input.required<ToDoTask>();

  //endregion
  //region Output

  /**
   * Событие, которое отправляется при запросе на удаление задачи.
   * Передает id задачи.
   */
  readonly remove = output<string>();

  /**
   * Событие, при выборе таски
   */
  readonly select = output<ToDoTask>();

  /**
   * Событие обновления задачи
   */
  readonly update = output<ToDoTask>();

  //endregion
  //region Ctor

  constructor() {

    effect(() => {

      if (this.isEditing() && this.titleInput()) {

        const el = this.titleInput()!.nativeElement;
        el.focus();
      }
    });
  }

  //endregion
  //region Handler

  /**
   * Обработчик клика по кнопке удаления.
   */
  removeTodo(event: MouseEvent): void {

    event.stopPropagation();
    this.remove.emit(this.item().id!);
  }

  /**
   * Обработчик клика по списку листа
   */
  selectTodo(event: Event) {

    event.stopPropagation();
    this.select.emit(this.item());
  }

  /**
   * Включает режим редактирования
   */
  enableEditMode(event: MouseEvent): void {

    event.stopPropagation();
    this.editedTitle.set(this.item().title);
    this.isEditing.set(true);
  }

  /**
   * Сохраняет изменения
   */
  saveTitle(event?: Event): void {

    event?.stopPropagation();

    const newTitle = this.editedTitle().trim();
    if (newTitle && newTitle !== this.item().title) {

      this.update.emit({
        ...this.item(),
        title: newTitle
      });
    }

    this.isEditing.set(false);
  }

  /**
   * Отменяет редактирование
   */
  cancelEdit(event?: Event): void {

    event?.stopPropagation();
    this.isEditing.set(false);
  }

  //endregion

}
