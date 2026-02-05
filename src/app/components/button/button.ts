import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * Возможный тип кнопок
 */
type ButtonType = 'add' | 'delete' | 'default';

/**
 * Общий компонент кнопки
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  //region Input

  /**
   * Наименование текста в кнопке
   */
  title = input.required<string>();

  /**
   * Заблокирована ли сейчас кнопка
   */
  disabled = input<boolean>();

  /**
   * Тип кнопки
   */
  typeButton = input<ButtonType>("default");

  //endregion
  //region Output

  /**
   * Прокси для передачи клика по кнопке
   */
  clickHandler = output<MouseEvent>();

  //endregion
}
