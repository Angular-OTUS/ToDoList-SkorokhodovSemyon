import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'src/app/components/toast/toast';

/**
 * Основной компонент приложения
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
