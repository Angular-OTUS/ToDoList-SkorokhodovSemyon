import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ToDoTask } from 'src/app/models/to-do-task';
import { Button } from 'src/app/components/button/button';
import { TooltipDirective } from 'src/app/components/directives/tooltip.directive';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListItem {
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
  remove = output<string>();

  //endregion
  //region Handler

  /**
   * Обработчик клика по кнопке удаления.
   */
  onRemove(event: MouseEvent): void {

    event.stopPropagation();
    this.remove.emit(this.item().id!);
  }

  //endregion

}
