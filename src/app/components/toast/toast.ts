import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast-service';
import { AsyncPipe } from '@angular/common';

/**
 * Компонент для отображения уведомлений
 */
@Component({
  selector: 'app-toast',
  imports: [AsyncPipe],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast {
  //region Fields

  /**
   * Сервис для работы с уведомлениями
   */
  private readonly toastService = inject(ToastService);

  /**
   * Массив активных Toast уведомлений
   */
  readonly toasts$ = this.toastService.toasts$;

  //endregion
  //region Handler

  /**
   * Удаляет Toast уведомление
   *
   * @param id идентификатор уведомления
   */
  removeToast(id: string): void {

    this.toastService.removeToast(id);
  }

  //endregion
}
