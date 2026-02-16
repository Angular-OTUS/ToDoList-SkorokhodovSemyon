import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

/**
 * Обертка над спиннер
 */
@Component({
  selector: 'app-spinner',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {

}
