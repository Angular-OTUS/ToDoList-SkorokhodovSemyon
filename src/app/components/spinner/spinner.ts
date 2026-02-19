import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

/**
 * Обертка над спиннер
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-spinner',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {

}
