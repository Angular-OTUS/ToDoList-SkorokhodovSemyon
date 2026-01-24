import { Component, input } from '@angular/core';

/**
 * Возможный тип кнопок
 */
type ButtonType = 'add' | 'delete' | 'default';

/**
 * Общий компонент кнопки
 */
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  //region Input

  /**
   * Наименование текста в кнопке
   */
  title = input.required<string>()

  /**
   * Заблокирована ли сейчас кнопка
   */
  disabled = input<boolean>()

  /**
   * Тип кнопки
   */
  typeButton = input<ButtonType>("default")

  //endregion
}
